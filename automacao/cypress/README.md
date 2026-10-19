# Cypress — produto que já usa Cypress

Boilerplate do core bancário. Suíte nova de interface fica no Playwright.

Práticas de escrita, seletor, espera, asserção e pipeline: [docs/LEIA-ME.md](docs/LEIA-ME.md).

Norma: [08-padrao-cypress.md](../../docs/padrao-qualidade/08-padrao-cypress.md).

```text
npm install
npm run cy:open
npm run cy:run:regressao
```

`CYPRESS_BASE_URL` e `CYPRESS_TOKEN_TITULAR` vêm do pipeline. Não commitar `.env` nem `cypress.env.json`.
