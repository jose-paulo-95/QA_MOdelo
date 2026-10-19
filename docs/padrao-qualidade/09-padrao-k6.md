# Padrão de teste de desempenho com k6

k6 é a única ferramenta de carga, pico, stress e resistência. Ele não substitui o caso funcional. Um script verde com limiar frouxo não prova a regra de saldo.

## 1. Quando escrever script

É obrigatório quando a avaliação de risco marcar eficiência de desempenho, capacidade ou escalabilidade. Situações típicas no core:

- caminho de transação crítica que mudou persistência, trava ou integração;
- janela batch com hora para acabar;
- campanha ou pico conhecido (folha, vencimento, abertura de canal);
- meta de latência ou vazão acordada no item de trabalho.

Fica de fora quando a mudança é só texto, permissão de uma tela ou regra sem impacto de volume. O relatório registra "k6 fora de escopo" com esse motivo.

## 2. Onde vive

Copie o boilerplate [automacao/k6/](../../automacao/k6/). No produto:

```text
tests/performance/
  <fluxo>.k6.js
  data/
  README.md
```

O README do produto diz qual ambiente aceita carga. Produção não aceita. Homologação compartilhada só aceita fumaça de desempenho, com poucas VUs, se o dono do ambiente autorizar por escrito no item.

## 3. Tipos de ensaio

| Tipo | Objetivo | Quando |
|---|---|---|
| Fumaça | O script e o ambiente respondem | Todo script novo, antes da carga |
| Carga | Volume acordado durante o período acordado | Mudança no caminho crítico |
| Pico | Subida rápida até o pico do negócio e volta | Campanha ou canal com rajada |
| Stress | Acima do acordo, para achar o joelho | Sob demanda de capacidade, não em toda release |
| Resistência | Carga moderada por tempo longo, para vazamento e fila | Batch ou processo contínuo |

A release exige fumaça mais o tipo que a avaliação marcou. Stress não é obrigatório em toda correção.

## 4. Como escrever o ensaio

1. Copie a condição funcional que já passou. Desempenho sem oráculo funcional conhecido mede o sistema errado.
2. Registre a meta no item de trabalho: vazão, percentil de latência, taxa de erro e duração. Sem meta numérica o script não entra na suíte oficial.
3. Modele a jornada mínima: autenticar uma vez por VU se o negócio for assim, executar a transação, consultar o efeito em uma amostra. Não reproduza a interface clique a clique.
4. Use massa sintética exclusiva de desempenho, larga o bastante para as VUs não disputarem a mesma conta e gerarem falso conflito.
5. Envie chave de idempotência única por iteração, salvo quando o ensaio for justamente de chave repetida.
6. Coloque a meta em `thresholds`. Meta só no texto do relatório não bloqueia pipeline.
7. Rode fumaça, depois a carga no ambiente autorizado, na build candidata.
8. Publique o resumo do k6 como artefato e o veredito no Test Plans, ligado aos casos funcionais do fluxo.

## 5. Asserções

- `checks` provam contrato mínimo da resposta: status esperado e presença do identificador.
- `thresholds` provam a meta: por exemplo `http_req_failed` e `http_req_duration` no percentil combinado.
- Uma amostra de iterações, no fim ou em outro passo, consulta saldo ou quantidade de lançamentos da massa. O ensaio que só olha HTTP 201 não detecta débito duplicado sob concorrência.

Se a amostra de negócio falhar, o ensaio falha mesmo com latência boa.

## 6. Nomenclatura e rastreio

- Arquivo: `tests/performance/transferencia.carga.k6.js`.
- Tag `testcase` com os IDs funcionais que o fluxo representa, por exemplo `TC-CORE-TRF-001`.
- O caso no Test Plans ganha um caso irmão `TC-CORE-TRF-001-PERF` apontando para o arquivo e para a meta.

## 7. Pipeline

O job de carga não roda em todo commit. Roda sob demanda no candidato, no agente e no ambiente autorizados. Fumaça pode rodar no pipeline diário se o ambiente aguentar. Falha de threshold reprova o ensaio. O aprovador da release vê o número, não um "ok" sem anexo.

## 8. Exemplo — carga da transferência

Meta ilustrativa, a substituir pela meta do produto: 50 requisições por segundo durante 2 minutos, p95 abaixo de 800 ms, erro HTTP abaixo de 1%, e amostra de contas sem lançamento duplicado.

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

const duracao = new Trend('transferencia_duration');

export const options = {
  scenarios: {
    carga: {
      executor: 'constant-arrival-rate',
      rate: 50,
      timeUnit: '1s',
      duration: '2m',
      preAllocatedVUs: 20,
      maxVUs: 100,
      tags: { testcase: 'TC-CORE-TRF-001-PERF' },
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<800'],
    checks: ['rate>0.99'],
  },
};

export default function () {
  const chave = `perf-${__VU}-${__ITER}`;
  const resposta = http.post(
    `${__ENV.BASE_URL}/transferencias`,
    JSON.stringify({
      origem: contaDaVu(__VU),
      destino: '9000',
      valor: 1,
    }),
    {
      headers: {
        Authorization: `Bearer ${__ENV.TOKEN_PERF}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': chave,
      },
    }
  );

  duracao.add(resposta.timings.duration);
  check(resposta, {
    'status 201': (r) => r.status === 201,
    'tem transactionId': (r) => !!r.json('transactionId'),
  });
  sleep(0.1);
}

function contaDaVu(vu) {
  return String(1000 + vu);
}
```

`contaDaVu` precisa apontar para a massa sintética real do ambiente. O passo de amostra de lançamentos duplicados roda como função `handleSummary` ou como teste funcional logo depois, com a lista de contas usadas, e o resultado entra no mesmo artefato.

## 9. Revisão

O revisor confere meta numérica, ambiente autorizado, massa que não colide, threshold que falha o comando, ausência de URL de produção e ausência de dado de cliente.
