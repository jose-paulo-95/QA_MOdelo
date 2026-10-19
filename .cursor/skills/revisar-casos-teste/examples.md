# Exemplos — revisar-casos-teste

## Caso ruim (trecho)

```text
TC-CORE-TRF-099
Quando faz transferência Então funciona
Passos: 1. Transferir. Esperado: ok
```

### Parecer
Rejeitado — oráculo fraco; sem massa; sem canal; sem classe.

## Caso bom

`TC-CORE-TRF-001` em [../escrever-casos-do-padrao/examples.md](../escrever-casos-do-padrao/examples.md) → Aprovado para automação `api`.

## HANDOFF_REVIEW_CASOS (exemplo)

```markdown
## HANDOFF_REVIEW_CASOS
- veredito: Aprovado com ressalvas
- aprovados_para_automacao:
  - TC-CORE-TRF-001 | playwright api | tests/api/specs/transferencia.api.spec.ts
- rejeitados: TC-CORE-TRF-099
- exigem_revisao_humana_ainda: TC-CORE-TRF-001 (R1)
```
