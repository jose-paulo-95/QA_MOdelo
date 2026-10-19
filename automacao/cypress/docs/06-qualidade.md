# 06. Qualidade

> Parte do [guia de Cypress](./LEIA-ME.md).

O que um revisor encontra no diff antes de falar de seletor.

## Massa

Conta `1001`, conta `2002`, valor `100,00`. Quem lê o spec, o Command Log ou o screenshot vê dado de laboratório. CPF, nome e extrato de cliente não entram na fixture nem no Git.

## Segredo

Token e senha vêm do pipeline (`CYPRESS_TOKEN_TITULAR`). `requireEnv` falha com o nome da variável se ela vier vazia. `cypress.env.json` está no `.gitignore`.

## Sem caminho condicional

Isto não entra no spec:

```typescript
cy.get('body').then(($body) => {
  if ($body.text().includes('erro')) {
    cy.contains('tentar de novo').click();
  }
});
```

O teste é determinístico. Dois caminhos são dois `TC-`.

## O que não vai para o commit

`.only` tira o resto da suíte da execução. Serve na depuração local e sai antes do commit.

`it.skip` de defeito conhecido leva três linhas acima do teste: o que está errado, o item de trabalho, quando remover o skip. Risco alto sem esse texto não fica na suíte que bloqueia release.

## Formato

Indentação de dois espaços, para o encadeamento alinhar com o `cy`:

```typescript
TransferenciaPage.comprovante()
  .should('be.visible')
  .invoke('text');
```

Os scripts do `package.json` chamam `cypress` direto, sem `npx`.

## Veja também

- [01. Estrutura](./01-estrutura.md)
- [07. Pipeline e revisão](./07-pipeline-e-revisao.md)
