# Referência — relatório e métricas

## Fórmulas (resumo)

| Métrica | Fórmula / valor |
|---|---|
| M1 | (casos R1/R2/R3 executados na build) / (previstos) × 100 |
| M2 | Contagem de bloqueante/crítico escapado na janela (pode ser “janela anterior” no go-live) |
| M3 | Verde ou Vermelha (job de regressão; skip de R1 sem desvio = vermelha) |
| M4 | Qtd de testes distintos flaky ainda na suíte que bloqueia (esperado 0) |

Detalhe e ações: `docs/padrao-qualidade/10-metricas.md`.

## Regra de veredito

| Veredito | Condição |
|---|---|
| Recomendo seguir | M1=100% (ou desvio escrito), M3 verde, sem bloqueante/crítico aberto, M4=0 na suíte que bloqueia, sem lacuna crítica de dados |
| Recomendo com desvio | Há desvio aceito **com aprovador e prazo** registrados |
| Não recomendo | M1 incompleto sem desvio, M3 vermelha, defeito bloqueante/crítico aberto, ou dados insuficientes para afirmar o contrário |

## Não fazer

- Não inventar % de M1 nem “pipeline verde” sem fonte.
- Não usar M2 da release atual como nó do dia do go-live se a janela ainda não fechou — use contexto da anterior.
- Não transformar falha cosmética de usabilidade em “não recomendo” se a norma da release batch assim definir — siga o relatório e as classes em escopo.

## Dados mínimos que o usuário deve fornecer

- Build e ambiente
- Contagem ou lista de TC- R1–R3 previstos vs executados
- Link ou status do job de regressão
- Defeitos abertos relevantes
- Lista de flaky na suíte que bloqueia (ou “nenhum”)
