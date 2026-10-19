# 04. Comandos e esperas

> Parte do [guia de Cypress](./LEIA-ME.md).

A espera é a condição de negócio. O Cypress retenta a query até ela valer ou estourar o timeout do comando.

## Alias da operação

A transferência tem rede. O flow registra o intercept **antes** do `visit`, confirma o HTTP da operação e só então lê a tela:

```typescript
cy.intercept('POST', '**/transferencias').as('criarTransferencia');
TransferenciaPage.abrir();
TransferenciaPage.preencher(origem, destino, valor);
TransferenciaPage.confirmar();
cy.wait('@criarTransferencia').its('response.statusCode').should('eq', 201);
return TransferenciaPage.comprovante().should('be.visible').invoke('text');
```

`cy.wait('@alias')` espera essa resposta. `cy.wait(3000)` não entra em código novo: passa numa máquina rápida e falha na lenta, e não diz qual estado o teste queria.

## O flow entrega a tela pronta

`transferirValor` só devolve o texto do comprovante com o elemento visível. Quem afirma débito, crédito ou quantidade de lançamentos é o spec.

## O que não usar como espera

| Evitar | No lugar |
|---|---|
| `cy.wait(número)` | alias da operação ou `be.visible` do comprovante |
| `.last()` enquanto a lista ainda renderiza | `should('have.length', n)` e só então `.last()` |
| Custom command para a jornada | flow em `cypress/support/flows` |

`cy.reload()` só no caso cujo efeito é o que sobrevive ao recarregar. Antes, uma asserção positiva do estado; depois, o efeito que o caso pede.

## Veja também

- [03. Seletores](./03-seletores.md)
- [05. Asserções](./05-assercoes.md)
