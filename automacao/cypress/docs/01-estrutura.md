# 01. Estrutura

> Parte do [guia de Cypress](./LEIA-ME.md).

Onde o teste mora e de onde vêm ambiente, massa e segredo.

## Pastas

```text
cypress/
  e2e/
    specs/          # um arquivo por módulo: <modulo>.web.cy.ts
    api/            # só enquanto o produto ainda não tem Playwright
  support/
    pages/          # seletores e ações da tela
    flows/          # jornada com nome de negócio
    env.ts          # falha cedo se o segredo não veio do pipeline
    e2e.ts          # registro do filtro @regressao
  fixtures/         # massa sintética
cypress.config.ts
```

Jornada de negócio não vai para `Cypress.Commands`. Page, flow e spec já separam a responsabilidade.

## baseUrl

O spec visita caminho (`/transferencias/nova`). A origem vem de `CYPRESS_BASE_URL`. Sem a variável, o config usa `https://homolog.exemplo.local`, que não é produção.

## Fixture

`cypress/fixtures/transferencia.hml.json` traz contas e valor sintéticos. O valor que o operador digita fica como texto (`100,00`), no formato do campo.

Senha, token e URL com credencial não entram no JSON. O token é `CYPRESS_TOKEN_TITULAR`, lido por `requireEnv` em `cypress/support/env.ts`. Se faltar, o teste para antes da jornada.

## Scripts

Na raiz deste boilerplate, sem `npx` dentro do `package.json`:

| Script | Uso |
|---|---|
| `npm run cy:open` | escrever e depurar |
| `npm run cy:run` | suíte inteira |
| `npm run cy:run:regressao` | só os `it` com `{ tags: '@regressao' }` |

O filtro depende de `@cypress/grep` **5.1.0**. Versão 6 ou maior exige Cypress 15 e não entra neste boilerplate sem subir os dois juntos.

## Veja também

- [02. Organização](./02-organizacao.md)
- [07. Pipeline e revisão](./07-pipeline-e-revisao.md)
