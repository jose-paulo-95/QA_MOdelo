# Defeito

## Sobre este template

| | |
|---|---|
| **Objetivo** | Registrar uma falha de forma **reproduzível e auditável**, ligada a caso/charter, build, risco e impacto de negócio — para o Azure Boards. |
| **Quando usar** | Resultado obtido ≠ esperado em execução de caso, charter, automação ou escape em produção/homologação pós-release. |
| **Quando não usar** | Para melhorar texto do caso sem falha de produto (atualize o `TC-`); para dúvida de requisito sem comportamento errado observado (devolva ao refinamento); para falha só de ambiente sem evidência de bug de software (registre incidente de ambiente, não severidade de produto, salvo se o produto deveria tratar a falha). |
| **Quem preenche** | Quem encontrou (QA, desenvolvedor, suporte). Severidade alinhada à [01-norma.md](../01-norma.md). |
| **Entrada** | Build, ambiente, passos, esperado × obtido, prova (Test Run / pipeline). |
| **Saída** | Work item de bug com rastreio ao `TC-` / charter e à classe de risco. |
| **Próximo passo** | Correção → reteste do caso na nova build; se escape (M2), reforçar `TC-` e automação. |
| **Referência** | [01-norma.md](../01-norma.md) §7, [10-metricas.md](../10-metricas.md) (M2) |

---

- Título:
- Produto e build:
- Ambiente:
- Caso ou charter:
- Classe de risco:
- Característica 25010:
- Severidade: bloqueante | crítico | alto | médio | baixo
- Canal:

## Passos

1.

## Resultado obtido

## Resultado esperado

## Prova

Link da evidência no Test Run ou no pipeline.

## Impacto

O que o saldo, a trilha, o contrato ou a tarefa humana faz de errado.
