# 07. Pipeline e revisão

> Parte do [guia de Cypress](./LEIA-ME.md).

## O que roda em cada momento

- Pull request do frontend: fumaça da jornada (`npm run cy:run` no recorte combinado com o time).
- Candidato a release: `npm run cy:run:regressao`.
- Vídeo ligado e screenshot na falha são o artefato. O Test Run guarda o link e o ID do caso.

Teste instável sai da suíte que bloqueia release no mesmo dia. O config deste boilerplate deixa `retries` em zero nesse job: retry não esconde falha intermitente.

## Tag que bloqueia release

O `it` de regressão declara a tag na opção que o plugin lê:

```typescript
it('TC-CORE-TRF-010 operador conclui transferencia e ve o comprovante @regressao', { tags: '@regressao' }, () => {});
```

`cy:run:regressao` passa `grepTags=@regressao` e `grepOmitFiltered=true`. Isso só filtra com o registro em `cypress/support/e2e.ts` e em `setupNodeEvents` do `cypress.config.ts`. Texto no título, sozinho, não separa a suíte.

Mantenha `@cypress/grep` em 5.1.0 enquanto o Cypress for 13. Subir só o plugin para 6+ quebra o config: a linha 6 troca `--env` por `--expose` e pede Cypress 15.

## Mobile web

`cy.viewport(390, 844)` no próprio `it` da jornada crítica, e só quando o caso de mobile web está em escopo. O ID é o do caso mobile, diferente do desktop. Viewport não evidencia app nativo.

## Checklist antes do merge

- [ ] Título com `TC-` e um caso por `it`
- [ ] Seletor na page, conferido no DOM; spec sem URL absoluta
- [ ] Sem `cy.wait(número)`, sem `if`, sem `.only`
- [ ] Comprovante ou efeito de tela com `be.visible`
- [ ] Oráculo é o Então do caso; valor em reais como texto
- [ ] `cy.request` só se a API oficial ainda não está no Playwright
- [ ] `@regressao` com `{ tags: '@regressao' }` e plugin registrado
- [ ] `it.skip`, se houver, com defeito, item de trabalho e quando remover

## Veja também

- [02. Organização](./02-organizacao.md)
- [05. Asserções](./05-assercoes.md)
- Norma [08-padrao-cypress.md](../../../docs/padrao-qualidade/08-padrao-cypress.md)
