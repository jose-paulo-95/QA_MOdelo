---
name: revisar-automacao-teste
description: >-
  Revisa código de automação Playwright, Cypress, Appium/WebdriverIO ou k6
  contra o padrão QA (camadas, TC- no título, oráculo, seletores, waits,
  segredos, flaky, M3/M4) antes do PR ou merge. No Cypress, também a norma 08:
  seletor conferido, asserção do Então, dinheiro como texto, independência e
  filtro real de @regressao. Use para code review de teste, revisar spec
  mobile, checklist de PR de automação, ou validar boilerplate.
  Se a entrada for requisito sem código/TC-, redirecione — não revise código inexistente.
---

# Revisar automação

## Objetivo

Parecer **Aprovado | Aprovado com ressalvas | Rejeitado** com base no padrão.

## Gate

- Sem arquivos de teste / sem HANDOFF_IMPLEMENTACAO e sem paths: pedir o código ou o handoff. Se o usuário colou só requisito → `identificar` / `escrever`, não esta skill.

## Contexto obrigatório

1. [_shared/glossario-padrao.md](../_shared/glossario-padrao.md)
2. [12-checklist-revisao-automacao.md](../../../docs/padrao-qualidade/12-checklist-revisao-automacao.md)
3. Norma 07 / 08 / 13 / 09 conforme ferramenta
4. [automacao/](../../../automacao/)
5. [reference.md](reference.md)
6. Formato: [examples.md](examples.md)

## Procedimento

1. Localizar arquivos (diff, paths, HANDOFF_IMPLEMENTACAO).
2. Identificar ferramenta(s).
3. Checklist doc 12 + [reference.md](reference.md). Em Cypress, incluir a norma 08 seções 5 a 8 e o checklist da seção 13.
4. Achados: arquivo:linha, severidade, correção, regra.
5. Veredito + M3/M4.

## Severidades / validações / não fazer

Ver [reference.md](reference.md) e glossário (severidade de review).

## Formato de saída

### Veredito
### Resumo
### Achados (tabela)
### Checklist
### Pode bloquear release? (M3/M4)
### Saída para a próxima skill (se aprovado ou após correção)

```markdown
## HANDOFF_REVIEW_CODIGO
- veredito: Aprovado|Aprovado com ressalvas|Rejeitado
- tc_cobertos:
- pipeline_sugerido:
- bloqueia_release: sim|nao
- pendencias:
```

Próximo passo opcional: `gerar-relatorio-metricas` no fechamento da release.
