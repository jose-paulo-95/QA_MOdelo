# Relatório de teste

## Sobre este template

| | |
|---|---|
| **Objetivo** | Dar ao aprovador um **veredito** da build/release: cobertura, canais, métricas M1–M4, defeitos que importam e desvios aceitos. |
| **Quando usar** | Fechamento da build candidata; fim da iteração de teste; pedido formal de go/no-go. |
| **Quando não usar** | No meio da execução diária (use Test Run); para planejar o que testar (use plano/identificação); para um único bug (use defeito). |
| **Quem preenche** | QA responsável. Desvios só com aprovador nomeado. |
| **Entrada** | Plano + Test Runs da build + pipeline + Boards (defeitos) + [10-metricas.md](../10-metricas.md). |
| **Saída** | Veredito: recomendo / recomendo com desvio / não recomendo. |
| **Próximo passo** | Decisão do aprovador; se não recomendar, correção e novo relatório na nova build. |
| **Referência** | [01-norma.md](../01-norma.md) §5 e §8, [10-metricas.md](../10-metricas.md) |

---

- Produto:
- Release ou iteração:
- Build:
- Ambiente:
- Plano no Azure Test Plans:

## Veredito

Recomendo seguir | Recomendo seguir com desvio aceito | Não recomendo seguir

## Cobertura

| Classe de risco em escopo | Casos previstos | Executados | Aprovados | Falhos |
|---|---|---|---|---|
| | | | | |

## Características exercitadas

| Característica 25010 | Exercitada | Prova |
|---|---|---|
| | | |

## Canais

| Canal | Como foi coberto | Lacuna assumida |
|---|---|---|
| API | | |
| Web | | |
| Desktop | | |
| Mobile | | |
| Usabilidade | | |
| k6 | | |

## Defeitos abertos que importam para a decisão

| ID | Severidade | Efeito de negócio |
|---|---|---|
| | | |

## Métricas (ver [10-metricas.md](../10-metricas.md))

| Métrica | Valor | Fonte (link) | Ação tomada |
|---|---|---|---|
| M1 Cobertura riscos altos | % | | |
| M2 Escapes (janela anterior, se houver) | | | |
| M3 Regressão automatizada | Verde / Vermelha | | |
| M4 Instáveis na suíte que bloqueia | | | |

## Regressão automatizada

- Pipeline:
- Resultado:
- Testes retirados por instabilidade:

## Desvios aceitos

| Regra dispensada | Aprovador | Prazo |
|---|---|---|
| | | |
