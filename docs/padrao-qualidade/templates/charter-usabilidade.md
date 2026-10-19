# Charter de usabilidade

## Sobre este template

| | |
|---|---|
| **Objetivo** | Registrar uma sessão de **capacidade de interação** (ISO 25010): a pessoa do papel conclui a tarefa sem ajuda indevida e sem erro de negócio. |
| **Quando usar** | Avaliação de risco marcou R6 ou capacidade de interação; mudança relevante de tela/fluxo para operador ou cliente. |
| **Quando não usar** | Para provar regra de saldo/tarifa (use casos de API/`TC-` funcionais); para regressão de clique automatizado; para auditoria WCAG completa (fica fora deste padrão até demanda própria); se R6 não está em escopo. |
| **Quem preenche** | Facilitador (QA). Quem executa a tarefa é outra pessoa do papel — não o facilitador “fazendo de conta” sem combinar. |
| **Entrada** | Tarefas escritas sem nome de botão; sucesso combinado; canal/dispositivo reais. |
| **Saída** | Sessão preenchida + achados com gravidade (bloqueia ou não a release). |
| **Próximo passo** | Defeitos bloqueantes em [defeito.md](defeito.md); preferências como melhoria, não como falha de R1. |
| **Referência** | [06-como-testar-por-canal.md](../06-como-testar-por-canal.md) (seção Usabilidade) |

---

- ID: CHU-<PRODUTO>-<MODULO>-<NNN>
- Papel de quem executa a tarefa:
- Canal e dispositivo:
- Build e ambiente:
- Duração: 30 minutos
- Facilitador:

## Tarefas

Escreva como o operador ou o cliente receberia a tarefa, sem nome de botão.

1.
2.
3. Cancelar ou corrigir antes de confirmar, sem gerar lançamento.

## Sucesso combinado antes da sessão

- Concluiu sem ajuda
- Efeito de negócio conferido:
- Nenhum dado de outro titular apareceu

## Sessão

| Tarefa | Concluiu sem ajuda | Tempo aproximado | Erro de negócio | Nota |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

## Lista de capacidade de interação

| Pergunta | Sim ou não | Prova |
|---|---|---|
| Achou a função sem mapa do facilitador | | |
| Na segunda tarefa parecida, evitou o erro anterior | | |
| Operou com teclado, mouse ou toque do canal real | | |
| Valor inválido e cancelamento não geraram lançamento | | |
| Foco, rótulo e leitura de valor e saldo foram possíveis no posto | | |

## Achados

| Gravidade | O que aconteceu | Defeito |
|---|---|---|
| Impede a tarefa | | |
| Induz erro de negócio | | |
| Atraso recuperável | | |
| Preferência | | |
