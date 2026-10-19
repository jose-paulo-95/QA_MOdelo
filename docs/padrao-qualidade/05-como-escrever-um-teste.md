# Como escrever um teste

Este é o procedimento obrigatório para qualquer canal. API, desktop, mobile e usabilidade acrescentam passos no [06-como-testar-por-canal.md](06-como-testar-por-canal.md). Não comece pelo script.

## Passo 1. Ler a mudança até achar comportamentos observáveis

Abra o item de trabalho e anote frases no formato "quando <ação>, o sistema <efeito verificável>".

Se a frase depende de "funcionar corretamente", volte ao refinamento e peça o efeito: saldo, status, mensagem, registro de trilha, código de resposta ou prazo. Sem efeito verificável não há caso.

Se ainda não souber **quais** cenários entram por tipo de aplicação (API, web, mobile, desktop), faça a descoberta em [11-identificar-cenarios.md](11-identificar-cenarios.md) antes do passo 3.

## Passo 2. Preencher a avaliação de risco

Use [templates/avaliacao-de-risco.md](templates/avaliacao-de-risco.md). Marque classes e características. Essa folha define quais técnicas o passo 4 pode usar.

## Passo 3. Escrever condições antes dos passos

Uma condição é uma frase. Um caso é a implementação dessa frase com dados e passos.

Formato único:

```text
Dado <estado inicial verificável>
Quando <ação única>
Então <efeito no saldo, status, contrato, trilha ou tarefa humana>
```

Regras da frase:

- um Quando por condição;
- o Então cita o oráculo, não um adjetivo;
- limite, permissão e falha no meio da operação viram condições próprias, não um parágrafo dentro do caminho feliz.

Identificador da condição: `CT-<PRODUTO>-<MODULO>-<NNN>`. O caso de baixo nível que a implementa usa `TC-` com o mesmo número. Se uma condição precisar de dois casos (dois papéis, dois canais), use sufixo `TC-...-001A`.

## Passo 4. Escolher a técnica e listar os dados

Siga a tabela de classes em [02-modelo-de-qualidade-e-modelagem.md](02-modelo-de-qualidade-e-modelagem.md).

Para limite numérico ou de data, escreva a tabela antes do caso:

| Ponto | Valor | Esperado |
|---|---|---|
| Último aceito | | |
| Primeiro recusado | | |
| Interno válido | | |

Para regra combinada, desenhe a tabela de decisão e transforme cada coluna com resultado diferente em uma condição.

Para ciclo de vida, liste estado atual, evento e estado destino. Inclua um evento proibido.

## Passo 5. Descer para o caso de baixo nível

Copie [templates/caso-de-teste.md](templates/caso-de-teste.md) para o Azure Test Plans. Campos obrigatórios: ID, item de trabalho, classe, característica, técnica, canal, pré-condição, massa, oráculo, passos e resultado esperado de cada passo.

Como escrever o passo:

1. Uma ação por linha.
2. A ação começa com verbo que o executor consegue realizar: chamar, informar, confirmar, consultar, repetir, derrubar a dependência.
3. O resultado esperado é observável na mesma linha. Não acumule três efeitos só no último passo.
4. Dados literais ficam no passo ou na massa nomeada. "Uma conta válida" sem identificador da massa não é reproduzível.
5. O último passo de movimento financeiro confere débito, crédito e o mesmo identificador de transação nos dois lançamentos.

Caso de alto nível, usado no refinamento, tem só a condição e a classe de risco. Ele não serve para execução.

## Passo 6. Preparar massa e ambiente

1. Crie a massa no ambiente de homologação com script ou fixture versionada. Anote os identificadores no caso.
2. Registre a build. Execução sem build não entra no relatório.
3. Confira o oráculo numa consulta anterior à ação: saldo antes, status antes, ausência do lançamento.
4. Confirme que a massa não contém nome, documento ou extrato de cliente real.

## Passo 7. Decidir automação

Automatize neste ciclo quando as três condições existem:

- a regra permanece depois desta release;
- o resultado é determinístico;
- o nível certo é API ou uma jornada curta de interface.

Deixe manual, com motivo no caso, quando a tela muda a cada refinamento, quando o oráculo é julgamento humano de usabilidade, quando o canal é desktop nativo/terminal, ou quando o app nativo ainda não tem suíte Appium no produto (registre a dívida).

Se automatizar, o título do teste é o ID do caso. O corpo segue o padrão da ferramenta.

## Passo 8. Revisar

Outro QA, em risco R1, R2, R3 ou R4, verifica:

- o Então é consequência da regra, não do jeito que a tela está hoje;
- limite e transição proibida existem;
- a massa permite repetir o caso;
- o caso de API existe quando há serviço, mesmo que também exista caso de tela.

## Passo 9. Executar e evidenciar

1. Execute na build do critério de entrada.
2. Siga os passos. Desvio vira nota no Test Run. Não altere o caso no meio da execução para fazer passar.
3. Guarde a prova do oráculo ligada ao caso.
4. Falha vira defeito com [templates/defeito.md](templates/defeito.md).

## Passo 10. Encerrar

Atualize o caso se a regra mudou durante a correção. Inclua na regressão permanente o que continuar verdadeiro no próximo ciclo. Feche a parte correspondente do [templates/relatorio-de-teste.md](templates/relatorio-de-teste.md).

## Exemplo completo — transferência interna

Item: ao transferir até o limite diário, debitar a origem, creditar o destino e gravar os dois lançamentos com o mesmo identificador.

Avaliação: R1, R4 e R5. Características: correção funcional, integridade, recuperabilidade. Canal principal: API. Interface: um cenário web. k6: não, porque a demanda não muda volume nem meta de latência.

Condição `CT-CORE-TRF-001`

```text
Dado a conta origem 1001 com saldo 100,00 e limite diário disponível 1000,00,
e a conta destino 2002 com saldo 50,00, ambas da mesma instituição, massa TRF-HML-01
Quando o titular da 1001 transfere 100,00 com a chave Idempotency-Key trf-001
Então a origem fica 0,00, o destino fica 150,00, existem dois lançamentos com o mesmo
transactionId, a resposta é sucesso e uma segunda chamada com a mesma chave não gera
terceiro lançamento
```

Caso `TC-CORE-TRF-001`, canal API, técnica limite mais repetição:

| # | Ação | Resultado esperado |
|---|---|---|
| 1 | Consultar saldos de 1001 e 2002 | 100,00 e 50,00 |
| 2 | `POST /transferencias` com valor 100,00, origem 1001, destino 2002, chave `trf-001`, token do titular | HTTP 201, corpo com `transactionId` e status `LIQUIDADA` |
| 3 | Consultar lançamentos pelo `transactionId` | Um débito em 1001 e um crédito em 2002, mesmo valor e mesmo id |
| 4 | Consultar saldos | 0,00 e 150,00 |
| 5 | Repetir o POST com a mesma chave e o mesmo corpo | HTTP 201 ou 200 com o mesmo `transactionId` e nenhum lançamento novo |

A condição irmã `CT-CORE-TRF-002` usa valor 1000,01 e espera recusa sem movimento. Ela é outro caso, não um passo extra deste.

O script correspondente está no padrão Playwright, seção do exemplo de API em [07-padrao-playwright.md](07-padrao-playwright.md).
