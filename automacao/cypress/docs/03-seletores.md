# 03. Seletores

> Parte do [guia de Cypress](./LEIA-ME.md).

Seletor fica na page. O spec não tem `cy.get`.

## Ordem

1. `data-testid` estável, combinado com o time de front.
2. Texto de negócio estável, quando o testid sozinho não distingue o elemento.
3. Papel e nome acessíveis, se o time já usa esse seletor nesta tela. A escolha fica registrada uma vez no `support`, não repetida em cada spec.

O seletor entra no código depois de conferido no DOM do produto: no front ou na tela de homologação. Não se inventa `data-testid`. Se o atributo não existe e o time pode alterar a tela, o caminho é incluí-lo.

## Vários elementos com o mesmo testid

Na page, o texto de negócio escolhe qual:

```typescript
cy.contains('[data-testid="lancamento"]', '100,00');
```

Leia como frase: o lançamento que contém `100,00`.

## O que fica de fora

- Classe gerada ou de estilo (`.btn`, `.sc-abc`, `.text-sm`)
- XPath
- Caminho longo (`div > div > button`)
- `.eq()`, `.first()` e `.last()` como forma de escolher o elemento

`.last()` só depois de afirmar a quantidade, e só quando o caso fala do último item:

```typescript
cy.get('[data-testid="lancamento"]').should('have.length', 2).last();
```

## Exemplo deste boilerplate

`cypress/support/pages/transferencia.page.ts` usa `conta-origem`, `conta-destino`, `valor`, `confirmar-transferencia` e `transaction-id`.

## Veja também

- [04. Comandos e esperas](./04-comandos-e-esperas.md)
- [05. Asserções](./05-assercoes.md)
