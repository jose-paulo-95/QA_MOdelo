# Referência — escrever casos

## Condição boa vs ruim

```text
# RUIM
Dado um usuário
Quando faz transferência
Então funciona

# BOM
Dado a conta origem 1001 com saldo 100,00 e limite diário 1000,00,
e a conta destino 2002 com saldo 50,00 (massa TRF-HML-01)
Quando o titular transfere 100,00 com Idempotency-Key trf-001
Então origem=0,00, destino=150,00, dois lançamentos com o mesmo transactionId,
e a repetição da mesma chave não gera terceiro lançamento
```

## Passos bons vs ruins

| Ruim | Bom |
|---|---|
| 1. Fazer a transferência. Esperado: ok | 1. POST /transferencias ... Esperado: HTTP 201 + transactionId |
| Esperado só no fim: “tudo certo” | Cada linha com consulta/saldo/status |
| “Informar dados válidos” | Informar origem 1001, destino 2002, valor 100,00 |

## Oráculos aceitáveis (core)

- Saldo antes/depois com aritmética explícita
- Quantidade e sentido dos lançamentos (débito/crédito)
- Mesmo `transactionId` / id de negócio
- Status de domínio: `LIQUIDADA`, `PENDENTE`, `REJEITADA`
- Trilha: autor + evento
- Recusa sem movimento (saldo inalterado)

## Oráculos inaceitáveis sozinhos

- “Status 200”
- “Página carregou”
- “Mensagem de sucesso” sem efeito no saldo
- “Sem erro”

## Um caso por preocupação

| Preocupação | Caso próprio |
|---|---|
| Valor no limite | TC-…-002 |
| Acima do limite | TC-…-003 |
| Sem token | TC-…-004 |
| Idempotência | TC-…-001 (passo de repetição) ou TC dedicado |
| Segundo plano no app | TC canal app, não misturar na API |

## Campos obrigatórios do TC- (espelho do template)

ID, item, classe, 25010, técnica, canal, nível, prioridade, automatizar, condição, ambiente, massa, permissão, oráculo (fonte), passos, rastreio de automação se já existir.
