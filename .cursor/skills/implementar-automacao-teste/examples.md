# Exemplos — implementar-automacao-teste

## Entrada

`TC-CORE-TRF-001` (API) do examples de `escrever-casos-do-padrao`. Ferramenta: Playwright.

## Gate

Se o usuário colar só o requisito sem `TC-`, **não implementar**. Responder: use `escrever-casos-do-padrao` (e `revisar-casos-teste` se R1).

## Arquivos a espelhar / criar

- `automacao/playwright/tests/api/clients/transferencia.client.ts` (já no boilerplate)
- `automacao/playwright/tests/api/clients/contas.client.ts`
- `automacao/playwright/tests/api/specs/transferencia.api.spec.ts`
- massa: `tests/support/data/transferencia.hml.json`

## Esqueleto do título

```typescript
test('TC-CORE-TRF-001 debita origem e credita destino uma unica vez @regressao', async ({ request }) => {
  // requireEnv, clients, saldo antes, POST, lançamentos, saldos depois, repetição chave
});
```

## Handoff para revisar-automacao-teste

```markdown
## HANDOFF_IMPLEMENTACAO
- ferramenta: playwright
- arquivos:
  - automacao/playwright/tests/api/specs/transferencia.api.spec.ts
  - automacao/playwright/tests/api/clients/transferencia.client.ts
- tc: TC-CORE-TRF-001
- como_rodar: npm run test:api
- env: BASE_URL, TOKEN_TITULAR
- todos_contrato: (paths reais do produto se ainda placeholder)
```

## Anti-exemplo (não gerar)

Spec com `waitForTimeout(5000)`, `goto('https://homolog...')`, título sem `TC-`, assert só `toBeVisible`.

## Cypress (legado)

Espelhar `automacao/cypress/`: page com `data-testid`, flow que espera o alias e o comprovante visível, spec com um `TC-` e o Então do caso. Valor de tela vem da fixture como texto (`100,00`). Não gerar `cy.wait(3000)`, `if` na tela, `.only`, nem `cy.request` se o mesmo oráculo já está no Playwright.
