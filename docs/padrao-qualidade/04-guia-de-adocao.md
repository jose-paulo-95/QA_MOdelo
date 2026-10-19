# Guia de adoção

O padrão entra em três passos. Tornar tudo obrigatório no mesmo dia, em todo produto legado, faz o time voltar para a pasta pessoal.

## Passo 1. Publicar e ensaiar a escrita

1. O time lê a norma e escreve, juntos, um caso real pelo [05-como-escrever-um-teste.md](05-como-escrever-um-teste.md).
2. O caso entra no Azure Test Plans do produto piloto, com ID `TC-`.
3. A avaliação de risco fica anexada ao item.
4. Ainda não se migra automação antiga.

Pronto deste passo: um item de trabalho com risco, caso de baixo nível e execução com build.

## Passo 2. Piloto de um produto

Escolha um produto com serviço HTTP e uma jornada de tela.

1. Casos novos de R1, R2 e R3 seguem o procedimento completo, inclusive API.
2. A suíte nova de interface nasce em Playwright. A suíte Cypress antiga continua, sem reescrita, e passa a citar o ID do caso no título quando o teste for tocado.
3. Um fluxo crítico ganha script k6 só se a avaliação marcar desempenho.
4. Desktop nativo do piloto, se existir, fica manual. App nativo: se o produto tiver app, incluir pelo menos um `TC-` N1 e avaliar Appium no passo 2; se a suíte ainda não existir, o relatório registra manual + dívida de automação.
5. No fim da release, a retrospectiva ajusta nome de pasta e campos do Test Plans. Ajuste de regra volta para este repositório.

Pronto deste passo: pipeline da API ligado ao Test Run, e nenhum caso novo só em planilha.

## Passo 3. Obrigatório para o que é novo

- Demanda nova de qualquer produto usa norma, escrita e canal.
- Legado: ao mexer num script, o autor aplica nomenclatura, ID e camada. Não há projeto de reescrita em massa.
- Exceção de ferramenta fica registrada no item, com prazo.

## O que o QA faz na segunda-feira

1. Abre o item e preenche [templates/avaliacao-de-risco.md](templates/avaliacao-de-risco.md).
2. Escreve condições e casos com [05-como-escrever-um-teste.md](05-como-escrever-um-teste.md).
3. Se houver API, desktop, mobile ou usabilidade, acrescenta [06-como-testar-por-canal.md](06-como-testar-por-canal.md).
4. Publica no Test Plans.
5. Automatiza só o que o passo 7 da escrita autorizar, no padrão 07, 08 ou 09.
6. Pede revisão de outro QA quando a classe for R1, R2, R3 ou R4.
7. Executa, anexa evidência e fecha o relatório.

## Exemplos de core — o que o piloto deve cobrir

Use estes quatro temas no produto piloto ou no primeiro ciclo de cada módulo. A escrita completa segue o [05-como-escrever-um-teste.md](05-como-escrever-um-teste.md). Aqui fica só o mínimo que o time não pode esquecer.

### Lançamento

| Campo | Conteúdo mínimo |
|---|---|
| Classes | R1, R2, R4 |
| Técnicas | Partição e limite de valor; transição de estado do lançamento |
| Casos | Valor válido; último valor aceito; primeiro recusado; papel sem alçada; consulta pelo `transactionId` |
| Canal | API obrigatória; uma jornada de tela se o operador lança pela interface |
| Oráculo | Débito, crédito (quando houver) e o mesmo identificador nos dois lados |
| Automação | Spec em `tests/api`; jornada em `tests/e2e` se existir tela |

### Estorno

| Campo | Conteúdo mínimo |
|---|---|
| Classes | R1, R2, R5 |
| Técnicas | Transição de estado; cenário de estorno parcial e total |
| Casos | Estorno do lançamento liquidado; estorno de lançamento já estornado (proibido); estorno após queda no meio da operação |
| Canal | API; tela só se o canal operacional for a tela |
| Oráculo | Saldos voltam ao estado esperado; trilha guarda o estorno e o lançamento original |
| Automação | API na regressão permanente |

### Conciliação

| Campo | Conteúdo mínimo |
|---|---|
| Classes | R1, R2 |
| Técnicas | Tabela de decisão (bate, divergência de valor, divergência de data, item sem par); limite de data de corte |
| Casos | Arquivo ou lote que bate; item com valor diferente; item após a data de corte; reprocessamento do mesmo lote |
| Canal | API ou job/batch documentado; k6 se a janela de lote tiver meta de duração |
| Oráculo | Quantidade conciliada, quantidade em divergência e saldo contábil da massa |
| Automação | API ou script de lote no Git; k6 só com meta numérica |

### Contrato externo

| Campo | Conteúdo mínimo |
|---|---|
| Classes | R3, R1, R5 |
| Técnicas | Cenário de contrato; falha da dependência; idempotência |
| Casos | Resposta de sucesso do parceiro; timeout; retentativa sem duplicar; chave repetida; payload rejeitado pelo esquema |
| Canal | API e, se houver, mock ou sandbox do parceiro no ambiente de teste |
| Oráculo | Status interno (liquidada, pendente, rejeitada) alinhado ao efeito no saldo; um único efeito por chave |
| Automação | Spec de API com dependência controlada; sem chamar produção do parceiro |

Cada exemplo gera pelo menos uma avaliação de risco anexada, casos `TC-` no Test Plans e, quando automatizado, o ID no título do spec.
