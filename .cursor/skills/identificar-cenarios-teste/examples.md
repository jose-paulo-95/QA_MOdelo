# Exemplos — identificar-cenarios-teste

## Entrada (requisito)

```text
Como cliente do app, quero transferir entre minhas contas com o mesmo limite
diário do internet banking. A transferência deve debitar a origem, creditar o
destino e não duplicar se eu tocar duas vezes em Confirmar.
A tela web do IB não muda nesta release.
```

## Saída esperada (resumo)

### Leitura
- Efeitos: débito/crédito, limite diário, idempotência no app
- Tipos: API, app nativo
- Lacunas: valor exato do limite (pedir ou marcar)

### Risco
- Classes: R1, R4, R5, R6
- 25010: correção funcional, integridade, recuperabilidade, capacidade de interação (leve)
- k6: não (sem meta de volume)

### Tabela (trecho)

| ID | Lista | Tipo | Classe | Decisão | Automatizar | CT- | Condição |
|---|---|---|---|---|---|---|---|
| C1 | negocio | API | R1 | incluir | api | CT-CORE-TRF-001 | Dado contas 1001/2002… Quando transfere 100 com chave K Então saldos e um transactionId; repetir chave não duplica |
| C2 | negocio | API | R1 | incluir | api | CT-CORE-TRF-002 | Quando valor acima do limite Então recusa sem movimento |
| C3 | negocio | API | R4 | incluir | api | CT-CORE-TRF-003 | Quando token de outro titular Então recusa sem ler/mover |
| C4 | canal | App nativo | R6/R5 | incluir | appium | CT-CORE-TRF-020 | Quando conclui no app Então comprovante + mesmo efeito da API |
| C5 | canal | App nativo | R5 | incluir | appium | CT-CORE-TRF-021 | Quando app vai a segundo plano na confirmação Então não duplica |
| C6 | canal | Web | R6 | adiar | nao | — | Web não muda nesta release |

### Ordem
1. CT-CORE-TRF-001 → 002 → 003 → 020 → 021

### Handoff para escrever-casos-do-padrao

```markdown
## HANDOFF_IDENTIFICACAO
- produto: CORE
- item: (colar ID)
- classes: R1,R4,R5,R6
- canais: API, app nativo
- lacunas: valor numérico do limite diário
- incluir:
  - CT-CORE-TRF-001 | API | R1 | api | (condição…)
  - CT-CORE-TRF-002 | API | R1 | api | …
  - CT-CORE-TRF-003 | API | R4 | api | …
  - CT-CORE-TRF-020 | App nativo | R6 | appium | …
  - CT-CORE-TRF-021 | App nativo | R5 | appium | …
- adiar: web (sem mudança nesta release)
```
