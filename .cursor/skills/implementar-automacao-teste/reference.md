# Referência de código — implementar automação

Espelhe sempre os exemplos em `automacao/`. Abaixo: o que copiar e o que rejeitar.

---

## Playwright

### Estrutura

```text
tests/api/clients + specs
tests/e2e/pages + flows + specs
tests/support/data + env.ts
```

### Bom

```typescript
// spec — oráculo de negócio
test('TC-CORE-TRF-001 debita origem e credita destino uma unica vez @regressao', async ({ request }) => {
  const token = requireEnv('TOKEN_TITULAR');
  const client = new TransferenciaClient(request);
  const contas = new ContasClient(request);
  const antes = await contas.consultarSaldo(massa.origem, token);
  const res = await client.transferir({ ... });
  expect(res.status(), 'HTTP transferência').toBe(201);
  const { transactionId } = await res.json();
  expect(await contas.consultarLancamentos(transactionId, token)).toHaveLength(2);
  expect(await contas.consultarSaldo(massa.origem, token)).toBe(antes - massa.valorValido);
});
```

```typescript
// page — seletores acessíveis
await this.page.getByRole('button', { name: /confirmar/i }).click();
await this.page.getByTestId('transaction-id');
```

### Ruim (não gerar)

```typescript
test('transferencia funciona', async ({ page }) => {
  await page.goto('https://homolog-fixo.banco.local/x');
  await page.click('#btn1');
  await page.waitForTimeout(5000);
  await expect(page.locator('div > span:nth-child(2)')).toBeVisible();
});
```

### Validações específicas Playwright

- Projetos: `api` | `desktop` | `mobile` conforme arquivo
- Sem `page.locator` complexo no spec
- Trace/screenshot só via config (já no boilerplate)

---

## Cypress

Norma [08](../../../docs/padrao-qualidade/08-padrao-cypress.md). Guia prático, um tema por arquivo: [automacao/cypress/docs/LEIA-ME.md](../../../automacao/cypress/docs/LEIA-ME.md). A camada é spec, flow e page. Jornada não vira custom command.

### Bom

- Seletor na page, conferido no DOM do produto (`data-testid`; texto de negócio estável se o testid se repete)
- `cy.intercept` + `cy.wait('@alias')` da operação; comprovante com `be.visible` antes de ler o identificador
- Valor em reais como o operador lê (`100,00` na fixture)
- Oráculo = Então do `TC-`. `cy.request` **somente** se a API oficial ainda não está no Playwright
- Segredo ausente falha na hora (`support/env.ts`), sem `Bearer undefined`
- `@regressao` no título e em `{ tags: '@regressao' }` no `it`; filtro por `@cypress/grep` 5.x no support e no config

### Ruim

```javascript
it('teste', () => {
  cy.visit('https://...');
  cy.get('.btn').click();
  cy.wait(3000);
  cy.get('body').should('contain', 'Sucesso');
});
```

```javascript
cy.get('[data-testid="lancamento"]').last().should('contain', '100');
if (Cypress.$('body').text().includes('erro')) {
  cy.contains('tentar de novo').click();
}
```

### Validações específicas Cypress

- Spec em `cypress/e2e/specs/*.cy.ts`
- Título com `TC-`
- Sem `cy.wait(número)`; espera é alias ou elemento visível
- Sem `if` no spec; sem `testIsolation: false`; sem `.only` no Git
- `it.skip` só com três linhas: defeito, item de trabalho, quando remover
- Não usar como evidência de app nativo
- Não calcular float para afirmar valor de tela

---

## Appium + WebdriverIO

### Bom

- Screen com `$('~accessibility-id')`
- Flow de negócio + `support/api` para lançamentos
- Caps de homologação via env
- Segundo plano: `driver.background(n)` em TC de interrupção

### Ruim

```typescript
it('app', async () => {
  await driver.touchAction({ action: 'tap', x: 100, y: 200 });
  await browser.pause(5000);
  expect(await $('//XCUIElementTypeApplication/.../XCUIElementTypeButton[3]').isDisplayed()).toBe(true);
});
```

### Validações específicas Appium

- Paths em `tests/mobile/`
- Sem coordenada fixa
- Sem `browser.pause`
- Oráculo API quando R1
- Package/bundle de homologação, não produção

---

## k6

### Bom

- `thresholds` numéricos no script
- Tag `testcase: TC-...-PERF`
- `__ENV.BASE_URL` / token
- Check de status + transactionId
- Chave de idempotência por VU/iteração

### Ruim

```javascript
export const options = { vus: 1000, duration: '1h' }; // sem threshold, sem meta
// URL de produção
// mesma conta para todos os VUs
```

### Validações específicas k6

- Não rodar contra produção
- Meta veio do item de trabalho (senão TODO + não inventar número mágico sem avisar)
- Amostra de negócio (lançamentos) mencionada no README ou pós-check

---

## Mapeamento canal → ferramenta

| Canal do TC- | Ferramenta |
|---|---|
| API | Playwright `tests/api` |
| Web / mobile web / Electron | Playwright `tests/e2e` (ou Cypress se legado) |
| App nativo | Appium `tests/mobile` |
| Desempenho | k6 |
| Desktop nativo / usabilidade | Não automatizar neste padrão (manual) |

---

## Independência e massa

- Cada teste cria/reserva massa ou usa chave única (`trf-${Date.now()}` só se o ambiente permitir; preferir massa nomeada do JSON).
- Não depender de “o teste anterior transferiu”.
- Limpeza: documentar se o ambiente exige; não apagar dado de outro teste.

## Segredos

| Fazer | Não fazer |
|---|---|
| `requireEnv('TOKEN_TITULAR')` | `const token = 'eyJhbG...'` |
| `.env.example` sem valores | Commitar `.env` |
| Cypress.env no pipeline | Senha no fixture JSON |
