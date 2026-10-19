# Referência — identificar cenários

## Hierarquia de prioridade (quando o tempo acaba)

1. Negócio R1 (saldo, lançamento, tarifa, estorno, conciliação)
2. R2 trilha / R3 contrato externo
3. R4 acesso / R5 continuidade
4. Uma jornada do canal principal (W1 / N1 / MW1)
5. Interrupção de canal (N2, sessão)
6. Usabilidade U1–U3
7. k6

## Bom vs ruim

### Requisito: “Transferência também no app, mesmo limite do IB”

| Ruim | Bom |
|---|---|
| 15 casos só de tela Android repetindo validação de campo | API: valor ok, limite+, limite-, idempotência, outro titular; App: N1 jornada + N2 segundo plano; Web: adiar |
| “Testar se o app funciona” | Então com saldo/transactionId |
| Automatizar = Playwright no app | Automatizar = api + appium |

### Requisito: “Ajustar label do botão Confirmar”

| Ruim | Bom |
|---|---|
| Matriz completa de transferência | R6 leve ou só W2/W1 se houver risco de operação; R1 adiado se regra não mudou |
| k6 | k6 = não |

### Requisito: “Parceiro PIX pode demorar 30s”

| Ruim | Bom |
|---|---|
| Só jornada feliz na web | R3: timeout, pendente, retentativa, idempotência; API incluir; UI só status pendente se houver tela |

## Validação da tabela (agente)

Para cada linha “incluir”, pergunte mentalmente:

1. Se este cenário falhar, o aprovador entende o risco de negócio?
2. Já existe outra linha que prova a mesma regra em nível mais barato (API)?
3. O tipo de app está correto (mobile web ≠ app nativo)?

Se (2) = sim e a linha atual é só UI sem ganho de canal → adiar ou fundir.

## Classes R — lembrete rápido

| Classe | Dispara inclusão quase sempre de |
|---|---|
| R1 | Limite, partição, estado do lançamento, oráculo débito/crédito |
| R2 | Trilha quem/quando; tentativa de adulteração |
| R3 | Contrato, timeout, retry, chave |
| R4 | Papel, token, outro titular |
| R5 | Queda no meio, reprocessamento |
| R6 | Jornada humana + usabilidade se marcado |

## ISO 25010 — não criar suíte fantasma

- Liberdade de risco econômico → classes R1/R2, não suíte separada
- Capacidade de interação → charter U, não 20 casos de clique
- Desempenho → k6 com meta; sem meta = lacuna, não script
