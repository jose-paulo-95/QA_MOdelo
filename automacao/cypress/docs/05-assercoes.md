# 05. Asserções

> Parte do [guia de Cypress](./LEIA-ME.md).

O teste afirma o Então do `TC-`. A tela mostra o que o produto faz. Se os dois divergirem, o teste falha. Não se reescreve a asserção para copiar o defeito e deixar o caso verde.

## O que fecha a jornada

No `TC-CORE-TRF-010` o operador vê o comprovante e o identificador liga a transação aos lançamentos. HTTP 201 sozinho, ou a palavra "sucesso", não fecha risco financeiro.

Enquanto a API oficial deste produto ainda é Cypress, o spec consulta `/lancamentos?transactionId=...` e espera os dois lançamentos. Quando essa regra já está no Playwright, apague o `cy.request` daqui. O spec Cypress fica com a tela; o job de API prova o contrato na mesma build. Idempotência não se repete nos dois.

## Visível

O que o operador precisa ver usa `be.visible`. `exist` só quando o caso fala de presença no DOM, não de visão. Não encadeie `exist` e `be.visible` no mesmo elemento: visível já implica que está no DOM.

## Positiva antes da negativa

Uma negativa (`not.exist`, mensagem que não deveria aparecer) passa cedo se a jornada nem chegou na tela. Primeiro prove a tela certa; depois afirme a ausência.

```typescript
cy.get('[data-testid="comprovante"]').should('be.visible');
cy.contains('saldo insuficiente').should('not.exist');
```

## Dinheiro é texto

Afirme `100,00`, como o campo e o comprovante mostram. Não calcule float no spec para comparar com a tela: `4.99 * 3` em JavaScript não é o texto que o operador lê.

## Identificador que muda a cada execução

Use o identificador para achar o lançamento. Não invente tamanho de string. O formato só entra na asserção se o caso o promete.

## Formulário

Regra do produto: mensagem de domínio, ou atributo que o front define (`required`, `type`). O balão nativo do navegador muda com o idioma e não é oráculo.

## Veja também

- [02. Organização](./02-organizacao.md)
- [06. Qualidade](./06-qualidade.md)
