---
name: implementar-automacao-teste
description: >-
  Implementa automação (Playwright, Cypress, Appium/WebdriverIO ou k6) a partir
  de um caso TC- já escrito no padrão do core bancário, após revisão de casos
  quando R1–R4. Usa boilerplate em automacao/, camadas spec/flow/page|screen,
  ID no título e oráculo de negócio. Use para automatizar TC-, gerar spec
  E2E/API/app nativo/performance — não use se o usuário só colou requisito sem TC-.
---

# Implementar automação a partir do cenário

## Objetivo

Gerar código no padrão do repositório a partir de um `TC-` aprovado. Espelhar o boilerplate; não inventar estrutura paralela.

## Gate (obrigatório)

- Se a entrada for **requisito sem `TC-`** (sem HANDOFF_CASOS / passos / oráculo): **não implementar**. Redirecionar para `escrever-casos-do-padrao` (e `revisar-casos-teste` se R1–R4).
- Se R1–R4 e o usuário não confirmou revisão humana/agente de casos: avisar e sugerir `revisar-casos-teste` antes, salvo pedido explícito de “implementar mesmo assim”.

## Contexto obrigatório

1. [_shared/glossario-padrao.md](../_shared/glossario-padrao.md)
2. [automacao/README.md](../../../automacao/README.md)
3. Norma: [07](../../../docs/padrao-qualidade/07-padrao-playwright.md) | [08](../../../docs/padrao-qualidade/08-padrao-cypress.md) | [13](../../../docs/padrao-qualidade/13-padrao-appium-wdio.md) | [09](../../../docs/padrao-qualidade/09-padrao-k6.md)
4. Exemplo em `automacao/<ferramenta>/`
5. [reference.md](reference.md)
6. Formato: [examples.md](examples.md)

Entrada preferencial: `## HANDOFF_CASOS`.

## Procedimento

1. Escolher ferramenta e pasta (`tests/api|e2e`, `cypress/`, `tests/mobile`, `tests/performance`).
2. Reusar client/page/screen/flow/data; criar só o que faltar.
3. Um `test`/`it` por `TC-`; título = ID + efeito + `@regressao` se bloquear release.
4. Asserções = Então do caso. UI/app R1 → também API.
5. Segredos via env. Sem wait fixo, XPath absoluto, coordenada, dado real.
6. Lacunas: `// TODO(contrato):`.
7. Emitir **HANDOFF_IMPLEMENTACAO** e pedir `revisar-automacao-teste`.

## Validações / Não fazer

Checklist e anti-padrões em [reference.md](reference.md).

## Formato da resposta

1. Ferramenta + paths  
2. Código/diff  
3. Como rodar + env  
4. TODOs  
5. Auto-checagem  

### Saída para a próxima skill

```markdown
## HANDOFF_IMPLEMENTACAO
- ferramenta: playwright|cypress|appium|k6
- arquivos:
  - path/arquivo.ts
- tc: TC-...
- como_rodar:
- env:
- todos_contrato:
```
