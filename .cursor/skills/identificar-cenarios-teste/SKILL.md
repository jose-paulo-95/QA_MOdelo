---
name: identificar-cenarios-teste
description: >-
  Identifica o que testar a partir de requisitos ou user stories no padrão de
  qualidade do core bancário. Classifica tipos de aplicação (API, web, desktop,
  mobile web, app nativo, batch), marca riscos R1–R6 e ISO 25010, separa
  cenários de negócio e de canal, e devolve a tabela incluir/adiar/automatizar
  com IDs CT- e bloco HANDOFF_IDENTIFICACAO para a skill seguinte. Use quando o
  usuário colar requisito, pedir o que testar, análise de cenários, escopo de
  teste, ou identificação de casos por canal (após refinidade, antes de escrever TC-).
---

# Identificar cenários de teste

## Objetivo

Produzir a **lista do que testar** no padrão do repositório — não scripts, não prosa genérica de QA, não 50 casos de tela repetindo a mesma regra.

## Contexto obrigatório (ler antes de responder)

1. [_shared/glossario-padrao.md](../_shared/glossario-padrao.md) — R1–R6, canais, prefixos
2. [docs/padrao-qualidade/11-identificar-cenarios.md](../../../docs/padrao-qualidade/11-identificar-cenarios.md)
3. [02-modelo-de-qualidade-e-modelagem.md](../../../docs/padrao-qualidade/02-modelo-de-qualidade-e-modelagem.md)
4. [06-como-testar-por-canal.md](../../../docs/padrao-qualidade/06-como-testar-por-canal.md)
5. [reference.md](reference.md) — anti-exemplos
6. Se dúvida de formato: [examples.md](examples.md)

## Entrada

Requisito, história, aceite ou descrição da mudança. Se faltar efeito observável ou tipo de app: **no máximo 3 perguntas**; marque lacunas e continue o restante.

## Procedimento (ordem fixa)

1. Resumir efeitos observáveis (2–4 bullets).
2. Classificar tipos de aplicação impactados.
3. Marcar R1–R6 e características 25010:2023.
4. Extrair cenários de **negócio** (perguntas §3 do guia 11).
5. Rodar inventário só dos canais marcados (matrizes A/W/D/MW/N/B/U).
6. Priorizar: incluir / adiar / automatizar (API primeiro).
7. Emitir saída + **HANDOFF_IDENTIFICACAO**. **Não** escrever passos `TC-` aqui.

## Validações antes de entregar

- [ ] Todo “incluir” tem efeito observável no Então
- [ ] Regra financeira/contrato na linha API/negócio, não só UI
- [ ] Sem duplicata canal×canal da mesma regra sem ganho
- [ ] Limite: último aceito + primeiro recusado quando couber
- [ ] R3: sucesso + falha/timeout + idempotência ou adiado com motivo
- [ ] R6/usabilidade só se canal marcado; k6 só com desempenho
- [ ] Lacunas listadas; ordem só com “incluir”; CT- sem colisão

## Boas práticas / Não fazer

Ver [reference.md](reference.md). Resumo: poucos cenários certos; Automatizar = `api|ui|appium|k6|manual|nao`; não inventar limite; não Playwright como app nativo.

## Formato de saída

### 1–5. Leitura, risco, tabela, ordem, auto-checagem
(igual ao fluxo anterior)

### 6. Saída para a próxima skill (obrigatório)

```markdown
## HANDOFF_IDENTIFICACAO
- produto:
- item:
- classes:
- canais:
- lacunas:
- incluir:
  - CT-... | <tipo app> | <classe> | <automatizar> | <condicao 1 linha>
- adiar:
  - <item> | <motivo>
```

### 7. Próximo passo
Oferecer `escrever-casos-do-padrao` consumindo o HANDOFF.
