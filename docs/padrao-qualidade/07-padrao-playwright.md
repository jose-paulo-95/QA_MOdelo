# Padrão de automação com Playwright

Obrigatório para suíte nova de interface web, mobile web, Electron e para teste de API do core. Cypress não é proibido: a regra de quando usá-lo está em [08-padrao-cypress.md](08-padrao-cypress.md). Os dois seguem as mesmas leis de rastreio, camada e pipeline.

## 1. Quando este padrão se aplica

- produto novo;
- suíte de interface que ainda não existe;
- API funcional do core, na pasta `tests/api`;
- web desktop e mobile web do mesmo produto, como projetos do mesmo `playwright.config.ts`.

App nativo usa Appium + WebdriverIO ([13-padrao-appium-wdio.md](13-padrao-appium-wdio.md)). Janela Windows nativa / terminal continua manual até exceção na norma.

## 2. Estrutura no repositório do produto

Copie o boilerplate [automacao/playwright/](../../automacao/playwright/) para o repo do produto. Estrutura alvo:

```text
tests/
  api/
    specs/
    clients/
  e2e/
    specs/
    pages/
    flows/
    fixtures/
  support/
    data/
playwright.config.ts
```

`tests/performance/` é do k6 e não mistura spec do Playwright. Implementação assistida: skill `implementar-automacao-teste`. Revisão: `revisar-automacao-teste`.

## 3. Projetos

| Projeto | Uso |
|---|---|
| `api` | Sem browser. Base URL do ambiente via variável |
| `desktop` | Chromium, viewport 1366×768 |
| `mobile` | Um device do parque real, um fluxo crítico por jornada |

A suíte que bloqueia release de risco R1–R3 é a do projeto `api`, mais os specs de jornada marcados como regressão. Projeto `mobile` bloqueia quando R6 mobile está em escopo.

## 4. Nomenclatura

- Arquivo de spec: `<modulo>.<canal>.spec.ts`, em minúsculas. Exemplo: `transferencia.api.spec.ts`.
- Título do teste: ID do caso mais o efeito. Exemplo: `TC-CORE-TRF-001 debita origem e credita destino uma unica vez`.
- Page: `<NomeDaTela>Page`.
- Fluxo: verbo de negócio, `transferirValor`.
- Client de API: `<Recurso>Client`.

Um teste automatizado cobre um caso `TC-`. Vários casos no mesmo teste impedem saber qual regra quebrou.

## 5. Camadas

1. **Spec.** Monta a massa, chama o fluxo ou o client, afirma o oráculo. Não contém seletor nem URL solta.
2. **Fluxo.** Uma operação de negócio: transferir, estornar, consultar extrato.
3. **Page ou client.** Página guarda seletores e ações de tela. Client guarda método HTTP e o tipo da resposta.
4. **Massa.** JSON ou factory em `tests/support/data`, sem documento real.

## 6. Seletores

Ordem obrigatória: papel acessível e nome (`getByRole`), rótulo (`getByLabel`), texto estável de negócio, atributo `data-testid` acordado com desenvolvimento. Coordenada, XPath absoluto e classe gerada pelo framework ficam de fora.

## 7. Esperas

A espera é o efeito: resposta da transferência, lançamento visível, status `LIQUIDADA`. Tempo fixo com `waitForTimeout` fica de fora do código novo.

## 8. Asserções

A asserção final repete o Então do caso: status HTTP quando for API, saldos, quantidade de lançamentos e `transactionId` único. Asserção que só verifica "página carregou" não conta como automação do caso de negócio.

## 9. Independência

Cada teste cria ou reserva a própria massa e não depende da ordem do arquivo. Limpeza remove o que o teste criou quando o ambiente é compartilhado. Segredo vem de variável de ambiente do pipeline, nunca do spec commitado.

## 10. Rastreio e pipeline

- O ID do caso aparece no título.
- O Azure Test Plans marca o caso como automatizado e guarda o caminho do spec.
- O pipeline da build roda `api` em todo merge do serviço e a jornada de regressão no candidato a release.
- Relatório e trace de falha são artefatos do pipeline. O Test Run recebe o link.
- Teste instável sai da suíte que bloqueia release no mesmo dia, vira defeito da automação e só volta depois de estável em execuções repetidas.

## 11. Revisão do pull request

O revisor confere: um caso por teste, oráculo de negócio, ausência de dado real, ausência de espera fixa, seletor na camada de página, projeto certo e ID no título.

## 12. Exemplo de API — `TC-CORE-TRF-001`

`tests/api/clients/transferencia.client.ts`

```typescript
import { APIRequestContext } from '@playwright/test';

export class TransferenciaClient {
  constructor(private readonly api: APIRequestContext) {}

  transferir(input: {
    origem: string;
    destino: string;
    valor: number;
    chaveIdempotencia: string;
    token: string;
  }) {
    return this.api.post('/transferencias', {
      headers: {
        Authorization: `Bearer ${input.token}`,
        'Idempotency-Key': input.chaveIdempotencia,
      },
      data: {
        origem: input.origem,
        destino: input.destino,
        valor: input.valor,
      },
    });
  }
}
```

`tests/api/specs/transferencia.api.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import { TransferenciaClient } from '../clients/transferencia.client';

test('TC-CORE-TRF-001 debita origem e credita destino uma unica vez', async ({ request }) => {
  const client = new TransferenciaClient(request);
  const chave = 'trf-001';
  const token = process.env.TOKEN_TITULAR_1001!;

  const saldoOrigemAntes = await consultarSaldo(request, '1001', token);
  const saldoDestinoAntes = await consultarSaldo(request, '2002', token);

  const primeira = await client.transferir({
    origem: '1001',
    destino: '2002',
    valor: 100,
    chaveIdempotencia: chave,
    token,
  });
  expect(primeira.status()).toBe(201);
  const corpo = await primeira.json();

  const lancamentos = await consultarLancamentos(request, corpo.transactionId, token);
  expect(lancamentos).toHaveLength(2);

  const segunda = await client.transferir({
    origem: '1001',
    destino: '2002',
    valor: 100,
    chaveIdempotencia: chave,
    token,
  });
  expect([200, 201]).toContain(segunda.status());
  expect((await segunda.json()).transactionId).toBe(corpo.transactionId);

  expect(await consultarSaldo(request, '1001', token)).toBe(saldoOrigemAntes - 100);
  expect(await consultarSaldo(request, '2002', token)).toBe(saldoDestinoAntes + 100);
});
```

A última asserção do destino deve usar o saldo lido no início mais 100. Ajuste as funções `consultarSaldo` e `consultarLancamentos` para o contrato real do produto. O exemplo fixa a estrutura, não a URL do banco.

## 13. Exemplo de jornada web

O spec de interface chama `transferirValor` no fluxo, confirma o comprovante com `transactionId` e em seguida consulta a API para provar o saldo. A tela sozinha não fecha oráculo de core.

```typescript
test('TC-CORE-TRF-010 operador conclui transferencia e ve o comprovante', async ({ page, request }) => {
  const comprovante = await transferirValor(page, {
    origem: '1001',
    destino: '2002',
    valor: '100,00',
  });
  await expect(page.getByRole('heading', { name: 'Comprovante' })).toBeVisible();
  await expect(page.getByText(comprovante.transactionId)).toBeVisible();

  const lancamentos = await consultarLancamentos(request, comprovante.transactionId, process.env.TOKEN_TITULAR_1001!);
  expect(lancamentos).toHaveLength(2);
});
```

Viewport e device ficam no config, não espalhados em cada spec.
