# Métricas da primeira versão

As quatro métricas da [norma](01-norma.md) existem para decidir release e corrigir o processo. Não existem para ranking de pessoa. Quem mede: QA do produto. Quem age com o número: QA, desenvolvimento e aprovador da release.

**Risco alto**, neste documento, é caso marcado com classe R1, R2 ou R3 na avaliação de risco e no Azure Test Plans.

---

## Visão rápida

| Código | Nome | Frequência | Esperado na v1 |
|---|---|---|---|
| M1 | Cobertura de execução dos riscos altos | Toda build candidata a release | 100%, ou desvio aceito por escrito |
| M2 | Defeito crítico escapado | Toda release + revisão mensal | 0 na release; investigar se > 0 |
| M3 | Regressão automatizada dos riscos altos | Toda build candidata e todo merge do serviço | Verde |
| M4 | Instabilidade da suíte oficial | Semanal e a cada falha suspeita | 0 teste instável na suíte que bloqueia |

---

## M1 — Cobertura de execução dos riscos altos

### O que significa

Dos casos de risco alto previstos para a build candidata, quantos foram de fato executados nessa build (passou ou falhou conta; não executado não conta).

### Fórmula

```text
M1 = (casos R1/R2/R3 executados na build) / (casos R1/R2/R3 previstos no plano da release) × 100
```

- **Previsto:** casos ligados aos itens da release, com classe R1, R2 ou R3, no plano do Azure Test Plans.
- **Executado:** aparece no Test Run da build candidata com resultado Pass, Fail ou Blocked. `Not applicable` só entra se o aprovador registrou desvio.
- Caso só “planejado” ou “design” não entra no numerador.

### Como captar

1. No Azure Test Plans, abra o plano da release.
2. Filtre a suíte ou a query pelos casos com classe R1, R2 ou R3 (campo customizado, tag `R1`/`R2`/`R3`, ou suíte dedicada — o produto piloto fixa um dos três e não muda no meio da release).
3. Some os previstos.
4. No Test Run da build candidata, some quantos desses IDs têm resultado.
5. Registre o percentual no [templates/relatorio-de-teste.md](templates/relatorio-de-teste.md), tabela de cobertura.

Enquanto o campo de classe não existir no Test Plans, use a coluna “Classes de risco” do plano de teste preenchido e cruze manualmente com o Test Run. Isso vale só no piloto; depois o campo ou a tag vira obrigatório.

### Quando medir

- Ao fechar o relatório da build candidata.
- Não precisa medir em todo commit.

### Como ler

| Resultado | Leitura |
|---|---|
| 100% | Cobertura de execução completa para o que estava em escopo |
| < 100% com desvio aceito | Lacuna conhecida; o aprovador assumiu o risco |
| < 100% sem desvio | Critério de saída da norma não cumprido |
| Numerador > denominador | Contagem errada; refaça o filtro |

### O que fazer

| Situação | Ação obrigatória |
|---|---|
| M1 = 100% | Pode recomendar a release do ponto de vista desta métrica |
| M1 < 100% e ainda há tempo | Executar os casos faltantes na mesma build antes do relatório |
| M1 < 100% e a lacuna é aceitável | Aprovador registra desvio (caso, motivo, prazo) no item e no relatório. Sem isso, veredito é “não recomendo” |
| Mesmo módulo com M1 baixo em duas releases seguidas | Retrospectiva: massa, ambiente ou modelagem atrasada demais. Ajustar o processo, não só “correr na véspera” |

---

## M2 — Defeito bloqueante ou crítico escapado

### O que significa

Defeito de severidade **bloqueante** ou **crítica** (definição da norma) encontrado em produção, ou em homologação estável depois que a release já foi aprovada, e que está ligado a comportamento que a release alterou ou deveria ter coberto.

Não conta: melhoria, defeito cosmético, defeito de módulo fora do escopo da release, nem falha causada por incidente de infraestrutura sem mudança de software.

### Fórmula

```text
M2 = quantidade de defeitos bloqueantes ou críticos escapados na janela
```

Janelas:

- **Por release:** do go-live até 14 dias depois (ou até a próxima release, se for antes).
- **Mensal:** soma das releases do mês, para o produto.

### Como captar

1. No Azure Boards, filtre bugs do produto com severidade bloqueante ou crítica.
2. Marque os que têm data de descoberta na janela e origem “produção” ou “pós-release”.
3. Confirme no texto do defeito a build ou a release relacionada.
4. Anote o ID no relatório da release seguinte e na revisão mensal do produto.

Tag sugerida no Boards: `escapado`. Quem abre o bug em produção aplica a tag no mesmo dia.

### Quando medir

- Ao encerrar a janela de 14 dias da release.
- Uma vez por mês, por produto, na revisão de qualidade.

### Como ler

| Resultado | Leitura |
|---|---|
| 0 | Nenhum escape grave detectado na janela |
| ≥ 1 | A rede de risco, caso ou automação falhou para aquele cenário |
| Mesmo fluxo com escape repetido | Regressão permanente inexistente ou oráculo fraco |

### O que fazer

| Situação | Ação obrigatória |
|---|---|
| M2 = 0 | Nenhuma ação extra |
| M2 ≥ 1 | 1) Corrigir o defeito. 2) Abrir ou reforçar caso `TC-` permanente. 3) Automatizar na API se a classe for R1/R2/R3. 4) Registrar no relatório o buraco que deixou passar (sem caso, caso não executado, automação ausente, oráculo errado) |
| Dois escapes no mesmo módulo em 60 dias | Parar de aceitar desvio de M1 nesse módulo até a regressão automatizada cobrir o fluxo. Revisão com aprovador e desenvolvimento |

M2 não pune quem achou o defeito. Pune o processo que não tinha evidência antes do go-live.

---

## M3 — Regressão automatizada dos riscos altos

### O que significa

A suíte oficial que protege R1, R2 e R3 (em geral `tests/api` no Playwright, mais jornadas marcadas como regressão) passou na build em questão.

É binária: **verde** ou **vermelha**. Não se reporta “quase”.

### Fórmula

```text
M3 = Verde  se o job de regressão dos riscos altos da build terminou com sucesso
M3 = Vermelha  se falhou, não rodou, ou foi marcada como sucesso com teste crítico skipado sem desvio
```

Skip de teste de risco alto sem desvio registrado conta como vermelha.

### Como captar

1. No Azure Pipelines, abra a execução da build candidata (e do merge do serviço, para o job de API do módulo).
2. Identifique o job nomeado de forma estável, por exemplo `regressao-riscos-altos` ou `tests-api`.
3. Resultado do job → M3.
4. Cole o link do pipeline no relatório de teste e, se possível, no Test Run.

Produtos só com Cypress legado: o job de regressão de API/jornada crítica desse produto é a fonte até existir Playwright. O nome do job fica no [templates/plano-de-teste.md](templates/plano-de-teste.md).

### Quando medir

- Todo merge que altera o serviço de core (job de API do módulo).
- Toda build candidata a release (API + jornada de regressão).

### Como ler

| Resultado | Leitura |
|---|---|
| Verde | Regressão oficial passou naquela build |
| Vermelha por falha de produto | Defeito ou regressão real; não avance |
| Vermelha por falha de ambiente ou massa | Pipeline vermelho do mesmo jeito; corrigir ambiente antes de releitura |
| Verde com vários skips | Contagem inválida; trate como vermelha até remover o skip ou registrar desvio |

### O que fazer

| Situação | Ação obrigatória |
|---|---|
| Verde | Pode seguir no critério de saída desta métrica |
| Vermelha por produto | Não recomendar a release. Abrir defeito, corrigir, reexecutar na nova build |
| Vermelha por ambiente/massa | Corrigir ambiente ou massa; reexecutar. Se o atraso for inevitável, aprovador registra desvio com prazo — não “forçar verde” |
| Vermelha por teste instável | Ver M4: tirar o teste da suíte que bloqueia no mesmo dia, abrir defeito da automação, só devolver depois de estável |

---

## M4 — Instabilidade da suíte oficial

### O que significa

Quantidade de testes automatizados da suíte que bloqueia release que falham e passam em reexecução **sem mudança de produto, massa intencional ou ambiente declarado**. Ou seja: o resultado não é confiável.

### Fórmula

```text
M4 = quantidade de testes distintos classificados como instáveis no período
```

Um teste entra na conta quando, na mesma build (ou em duas execuções seguidas sem commit de produto), o resultado muda de Fail → Pass ou Pass → Fail sem causa de produto registrada.

### Como captar

1. Ao falhar um teste da suíte oficial, reexecute **só esse teste** uma vez na mesma build, ou rode o job de “quarantine check” se o pipeline tiver.
2. Se passar na segunda sem mudança: marque o teste como instável (tag `flaky` no caso do Test Plans e issue no Boards tipo “dívida de automação”).
3. Remova ou ignore o teste no job que bloqueia release **no mesmo dia**.
4. Conte semanalmente quantos IDs distintos estão com tag `flaky` ainda fora da suíte que bloqueia.

Fonte: pipeline (histórico do teste) + tag no Test Plans + work item de dívida.

### Quando medir

- Na hora da falha suspeita.
- Toda semana, por produto: lista de `flaky` abertos.

### Como ler

| Resultado | Leitura |
|---|---|
| 0 | Suíte oficial confiável |
| 1–2 pontuais | Ruído tratado; acompanhar prazo de correção |
| Crescente semana a semana | Automação virando falso alarme; M3 perde valor |
| Instável “deixado” na suíte que bloqueia | Violação da norma de automação |

### O que fazer

| Situação | Ação obrigatória |
|---|---|
| Teste oscila | 1) Tira da suíte que bloqueia no mesmo dia. 2) Abre dívida com dono e prazo (máximo uma iteração). 3) M3 passa a refletir só a suíte estável |
| Dívida no prazo | Corrige seletor, espera, massa ou isolamento; prova com N execuções seguidas verdes (mínimo 5 no pipeline ou local repetido). Só então devolve à suíte |
| Dívida vencida | Escalona no aprovador do produto; não devolve o teste “para não ficar descoberta” sem correção |
| Módulo com muitos flaky | Congela casos novos de automação de interface nesse módulo até a API de regressão estar estável |

Falso verde (skip silencioso) é pior que vermelho. Preferir M3 vermelha honesta a M3 verde com lixo instável.

---

## Como reportar as quatro juntas

No fechamento da build candidata, o relatório traz um bloco único:

| Métrica | Valor | Fonte (link) | Ação tomada |
|---|---|---|---|
| M1 Cobertura riscos altos | % | Test Plans / Test Run | |
| M2 Escapes (janela anterior, se houver) | N | Boards | |
| M3 Regressão automatizada | Verde / Vermelha | Pipeline | |
| M4 Instáveis na suíte que bloqueia | N | Tags flaky / Boards | |

Veredito da norma:

- **Recomendo seguir** só com M1 = 100% (ou desvio aceito), M3 verde, sem defeito bloqueante/crítico aberto, e M4 = 0 na suíte que bloqueia.
- **Recomendo com desvio** quando existe desvio escrito do aprovador.
- **Não recomendo** se M1 incompleto sem desvio, M3 vermelha, ou defeito bloqueante/crítico aberto.

M2 da release atual só fecha depois da janela de 14 dias; no go-live use o M2 da release anterior como contexto, não como nó bloqueante do dia.

---

## O que fica de fora na v1

Não medimos ainda: pontos de história de teste, % de automação sobre todos os casos, cobertura de código, MTTR, satisfação do time, custo de ferramenta. Entram só depois do piloto, se uma retrospectiva apontar decisão que esses números ajudem a tomar.
