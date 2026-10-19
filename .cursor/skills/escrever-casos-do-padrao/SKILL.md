---
name: escrever-casos-do-padrao
description: >-
  Escreve condições CT- e casos de teste TC- no padrão do core bancário
  (Dado/Quando/Então, passos com oráculo, canal, massa sintética) após
  identificação de cenários. Gera HANDOFF_CASOS para revisar-casos-teste ou
  implementar-automacao-teste. Use depois da identificação, para detalhar casos,
  preencher Azure Test Plans, ou transformar tabela incluir em casos de baixo nível.
---

# Escrever casos no padrão

## Objetivo

Transformar cenários **já incluídos** em condições e casos de baixo nível prontos para Azure Test Plans e automação.

## Contexto obrigatório

1. [_shared/glossario-padrao.md](../_shared/glossario-padrao.md)
2. [05-como-escrever-um-teste.md](../../../docs/padrao-qualidade/05-como-escrever-um-teste.md)
3. [templates/caso-de-teste.md](../../../docs/padrao-qualidade/templates/caso-de-teste.md)
4. [06-como-testar-por-canal.md](../../../docs/padrao-qualidade/06-como-testar-por-canal.md) se canal ≠ só API
5. [reference.md](reference.md)
6. Se dúvida de formato: [examples.md](examples.md)

Entrada preferencial: bloco `## HANDOFF_IDENTIFICACAO`. Sem tabela incluir/adiar → rode `identificar-cenarios-teste` antes.

## Procedimento

1. Fixar IDs `CT-` / `TC-` (avisar se usar `CORE`).
2. Condição: um Quando; Então com oráculo.
3. Caso baixo nível: metadados + pré-condições + massa + passos.
4. Movimento financeiro: último passo fecha débito, crédito e mesmo id.
5. Canal: só complemento do guia 06.
6. Coluna Automatizar; se o usuário pedir código, citar ferramenta (07 Playwright, 08 Cypress, 13 Appium, 09 k6) e encaminhar `implementar-automacao-teste` — **não** gerar script completo aqui.

## Validações / Não fazer

Ver checklist no histórico da skill e [reference.md](reference.md). Sem oráculo fraco; um canal por TC-; sem dado real.

## Formato de saída

Para cada caso: CT-/TC- + condição + pré-condições + passos + Automatizar.

Lista R1–R4 para revisão humana + auto-checagem.

### Saída para a próxima skill (obrigatório)

```markdown
## HANDOFF_CASOS
- produto:
- casos:
  - TC-... | canal: | classe: | automatizar: api|ui|appium|k6|manual|nao | path_sugerido:
- exigem_revisao_humana:
- corpo_completo: (seções TC acima ou link)
```

Próximo passo sugerido: `revisar-casos-teste` (obrigatório se R1–R4) → depois `implementar-automacao-teste` se automatizar ≠ manual/nao.
