---
name: revisar-casos-teste
description: >-
  Revisa casos manuais CT-/TC- do padrão core bancário (oráculo, um Quando,
  massa sintética, canal único, R1 com débito/crédito) antes de automatizar ou
  executar aceite. Use após escrever-casos-do-padrao, quando o usuário pedir
  review de casos, validar TC- para Test Plans, ou checar qualidade do caso
  antes do PR de automação.
---

# Revisar casos de teste (manuais)

## Objetivo

Parecer **Aprovado | Aprovado com ressalvas | Rejeitado** sobre condições/casos escritos — **antes** de `implementar-automacao-teste`.

## Contexto obrigatório

1. [_shared/glossario-padrao.md](../_shared/glossario-padrao.md)
2. [05-como-escrever-um-teste.md](../../../docs/padrao-qualidade/05-como-escrever-um-teste.md)
3. [templates/caso-de-teste.md](../../../docs/padrao-qualidade/templates/caso-de-teste.md)
4. Reference de escrita: [../escrever-casos-do-padrao/reference.md](../escrever-casos-do-padrao/reference.md)
5. [reference.md](reference.md)
6. Formato: [examples.md](examples.md)

Entrada: `## HANDOFF_CASOS` ou texto dos TC- colados.

## Procedimento

1. Listar cada `TC-` / `CT-` recebido.
2. Percorrer checklist de [reference.md](reference.md).
3. Achados com severidade (glossário: bloqueante / importante / sugestão).
4. Veredito global: o pior achado manda (qualquer bloqueante → Rejeitado).
5. Se Aprovado (ou ressalvas corrigíveis): emitir handoff para implementação dos que têm automatizar = api|ui|appium|k6.

## Gate

- Só requisito sem casos → redirecionar `identificar` / `escrever`.
- Não revisar código de spec aqui → `revisar-automacao-teste`.

## Formato de saída

### Veredito
### Resumo
### Achados (tabela: severidade | TC- | problema | correção)
### Checklist
### Saída para a próxima skill

```markdown
## HANDOFF_REVIEW_CASOS
- veredito:
- aprovados_para_automacao:
  - TC-... | ferramenta sugerida | path_sugerido
- rejeitados:
- exigem_revisao_humana_ainda: (R1–R4)
```

Próximo: `implementar-automacao-teste` só para aprovados com automatizar ≠ manual.
