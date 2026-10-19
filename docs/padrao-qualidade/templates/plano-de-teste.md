# Plano de teste

## Sobre este template

| | |
|---|---|
| **Objetivo** | Congelar o escopo de teste da **release ou iteração**: o que entra, o que fica de fora, ambiente, ferramentas e critério de saída. |
| **Quando usar** | No início do ciclo de teste da sprint/release; quando o aprovador precisa ver o contrato do que será (e não será) testado. Espelhar no Azure Test Plans. |
| **Quando não usar** | Para um único caso isolado (use caso de teste); para listar cenários de uma história (use identificação); para o veredito final (use relatório). |
| **Quem preenche** | QA responsável. Aprovador da release valida o fora de escopo. |
| **Entrada** | Itens da release + avaliações de risco + identificação dos cenários principais. |
| **Saída** | Escopo fechado + link do plano no Test Plans + critério de saída. |
| **Próximo passo** | Criar/atualizar suítes e [caso-de-teste.md](caso-de-teste.md) no Test Plans; ao fim, [relatorio-de-teste.md](relatorio-de-teste.md). |
| **Referência** | [01-norma.md](../01-norma.md), [03-testware-e-ferramentas.md](../03-testware-e-ferramentas.md) |

---

- Produto:
- Release ou iteração:
- Plano no Azure Test Plans (link):
- Build candidata:
- QA responsável:
- Aprovador:

## Escopo

| Item de trabalho | Classes de risco | Canais | Características 25010 |
|---|---|---|---|
| | | | |

## Fora de escopo

| Item | Motivo |
|---|---|
| | |

## Ambiente e massa

- Ambiente:
- Responsável pelo ambiente:
- Massa sintética:
- k6 neste ciclo: sim, meta registrada | não, motivo

## Ferramentas neste produto

- API:
- Interface:
- Desktop nativo: manual | não há
- App nativo: Appium+WDIO | manual (dívida) | não há
- Pipeline:

## Critério de saída desta release

- Casos das classes em escopo executados na build
- Sem defeito bloqueante ou crítico aberto
- Regressão automatizada dos riscos altos verde
- Relatório publicado
