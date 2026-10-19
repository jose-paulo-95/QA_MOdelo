---
name: gerar-relatorio-metricas
description: >-
  Preenche o relatório de teste e interpreta métricas M1–M4 (cobertura de riscos
  altos, escapes, regressão verde/vermelha, flaky) a partir de dados colados
  pelo usuário (Test Run, pipeline, defeitos). Use no fechamento de release ou
  build candidata, quando pedir veredito recomendo/não recomendo, relatório de
  QA ou consolidar M1–M4. Não inventa números sem fonte.
---

# Gerar relatório e métricas

## Objetivo

Preencher [templates/relatorio-de-teste.md](../../../docs/padrao-qualidade/templates/relatorio-de-teste.md) e aplicar [10-metricas.md](../../../docs/padrao-qualidade/10-metricas.md) para um veredito honesto.

## Contexto obrigatório

1. [_shared/glossario-padrao.md](../_shared/glossario-padrao.md)
2. [10-metricas.md](../../../docs/padrao-qualidade/10-metricas.md)
3. [templates/relatorio-de-teste.md](../../../docs/padrao-qualidade/templates/relatorio-de-teste.md)
4. [01-norma.md](../../../docs/padrao-qualidade/01-norma.md) §5 e §8
5. [reference.md](reference.md)
6. Formato: [examples.md](examples.md)

Entrada opcional: `HANDOFF_REVIEW_CODIGO` + dados que o usuário colar.

## Gate — não inventar números

- Se faltar fonte para M1, M3 ou defeitos abertos bloqueantes/críticos: marcar **lacuna** e **não** emitir veredito “Recomendo seguir”.
- Perguntar no máximo 3 dados críticos faltantes; no restante, preencher o template com “não informado”.

## Procedimento

1. Extrair da entrada: produto, build, ambiente, casos previstos/executados R1–R3, resultado pipeline, defeitos, flaky.
2. Calcular ou registrar M1–M4 conforme 10-metricas (fórmulas no reference).
3. Preencher o relatório completo (seções do template).
4. Aplicar regra de veredito do reference.
5. Listar ações obrigatórias se métrica ruim.

## Formato de saída

1. Relatório preenchido (markdown igual ao template).
2. Bloco de métricas com fonte/link ou “lacuna”.
3. Veredito + justificativa em 2–4 frases.
4. Ações (se houver).

```markdown
## HANDOFF_RELATORIO
- veredito: Recomendo seguir | Recomendo seguir com desvio aceito | Não recomendo seguir
- M1: M2: M3: M4:
- lacunas:
- desvios_aceitos:
```
