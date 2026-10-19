# Exemplos — escrever-casos-do-padrao

Parte do fluxo **transferência interna**. Entrada = handoff de `identificar-cenarios-teste`.

## TC-CORE-TRF-001 (API, R1)

- Classe: R1 | 25010: correção funcional, integridade | Técnica: limite + idempotência | Canal: API | Automatizar: api

**Condição**

```text
Dado a conta origem 1001 com saldo 100,00 e limite diário disponível 1000,00,
e a conta destino 2002 com saldo 50,00 (massa TRF-HML-01)
Quando o titular da 1001 transfere 100,00 com Idempotency-Key trf-001
Então origem fica 0,00, destino 150,00, existem dois lançamentos com o mesmo
transactionId, e a segunda chamada com a mesma chave não gera terceiro lançamento
```

**Passos (resumo)**

| # | Ação | Esperado |
|---|---|---|
| 1 | Consultar saldos 1001 e 2002 | 100,00 e 50,00 |
| 2 | POST /transferencias … chave trf-001 | 201 + transactionId + LIQUIDADA |
| 3 | Consultar lançamentos pelo id | 1 débito + 1 crédito, mesmo id |
| 4 | Consultar saldos | 0,00 e 150,00 |
| 5 | Repetir POST mesma chave | Mesmo transactionId; sem lançamento novo |

## TC-CORE-TRF-002 (API, acima do limite)

Condição: valor 1000,01 → recusa sem movimento. Dois passos: consultar saldo antes; POST; saldo inalterado.

## TC-CORE-TRF-020 (App nativo)

Canal: App nativo | Automatizar: appium  
Condição: jornada no aparelho com comprovante `transactionId` e lançamentos conferidos via API.

## Handoff para revisar-casos-teste / implementar

```markdown
## HANDOFF_CASOS
- produto: CORE
- casos:
  - TC-CORE-TRF-001 | canal: API | classe: R1 | automatizar: api | path: tests/api/specs/transferencia.api.spec.ts
  - TC-CORE-TRF-002 | canal: API | classe: R1 | automatizar: api | path: tests/api/specs/transferencia.api.spec.ts
  - TC-CORE-TRF-020 | canal: App nativo | classe: R6 | automatizar: appium | path: tests/mobile/specs/transferencia.android.spec.ts
- exigem_revisao_humana: TC-CORE-TRF-001,002,003 (R1/R4)
- corpo_completo: (anexar seções CT/TC acima)
```
