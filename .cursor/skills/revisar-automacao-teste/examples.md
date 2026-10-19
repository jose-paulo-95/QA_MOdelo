# Exemplos — revisar-automacao-teste

## Spec propositalmente ruim

```typescript
test('transferencia funciona', async ({ page }) => {
  await page.goto('https://homolog.banco.local/transferencias');
  await page.click('#btnOk');
  await page.waitForTimeout(5000);
  await expect(page.locator('div > span:nth-child(2)')).toBeVisible();
});
```

## Parecer esperado

### Veredito
Rejeitado

### Achados

| Severidade | Arquivo | Problema | Correção | Regra |
|---|---|---|---|---|
| Bloqueante | spec:1 | Sem ID TC- | Título `TC-CORE-TRF-…` | checklist |
| Bloqueante | spec:4 | waitForTimeout | Esperar efeito de negócio | 07 §7 |
| Bloqueante | spec:5 | Oráculo só visível | Saldos/lançamentos via API | 07 §8 |
| Importante | spec:2 | URL absoluta | baseURL + path | 07 |
| Importante | spec:3 | Seletor no spec | Page object + role/testid | 07 §6 |

### Pode bloquear release?
Não — M3 inválido até correção.

## Spec bom (referência)

Ver `automacao/playwright/tests/api/specs/transferencia.api.spec.ts` → Veredito: Aprovado (após alinhar contrato real do produto).
