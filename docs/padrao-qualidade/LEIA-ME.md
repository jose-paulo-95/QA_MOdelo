# Padrão de Qualidade de Software

Padrão único para os QAs do core bancário. A norma diz o que é obrigatório. Os guias de implementação dizem o passo a passo que cada QA segue para escrever e executar o teste.

Referências de método: syllabi ISTQB CTFL 4.0, CTAL-TA 4.0, CTAL-TM 3.0, CTAL-TAE 2.0 e CTAL-AT v2.0, e o modelo de qualidade ISO/IEC 25010:2023. Este padrão não reproduz esses documentos. Ele transforma o método em regra operacional da empresa.

## Por onde começar

| Situação | Documento |
|---|---|
| Entender a regra e o que bloqueia uma release | [01-norma.md](01-norma.md) |
| Saber o que testar no core e qual técnica usar | [02-modelo-de-qualidade-e-modelagem.md](02-modelo-de-qualidade-e-modelagem.md) |
| Saber onde guardar plano, caso, script e evidência | [03-testware-e-ferramentas.md](03-testware-e-ferramentas.md) |
| Implantar o padrão num produto | [04-guia-de-adocao.md](04-guia-de-adocao.md) |
| Escrever um caso de teste, do risco até a evidência | [05-como-escrever-um-teste.md](05-como-escrever-um-teste.md) |
| Testar API, desktop, mobile ou usabilidade | [06-como-testar-por-canal.md](06-como-testar-por-canal.md) |
| Automatizar interface ou API com Playwright | [07-padrao-playwright.md](07-padrao-playwright.md) |
| Automatizar interface com Cypress | [08-padrao-cypress.md](08-padrao-cypress.md) |
| Teste de carga com k6 | [09-padrao-k6.md](09-padrao-k6.md) |
| Captar, ler e agir sobre as métricas | [10-metricas.md](10-metricas.md) |
| Identificar o que testar por tipo de aplicação | [11-identificar-cenarios.md](11-identificar-cenarios.md) |
| Checklist de revisão de automação | [12-checklist-revisao-automacao.md](12-checklist-revisao-automacao.md) |
| App nativo iOS/Android (Appium + WDIO) | [13-padrao-appium-wdio.md](13-padrao-appium-wdio.md) |
| Código inicial Playwright / Cypress / Appium / k6 | [../../automacao/README.md](../../automacao/README.md) |
| Copiar um modelo em branco (com quando usar / não usar) | [templates/LEIA-ME.md](templates/LEIA-ME.md) |
| Agentes no Cursor (6 skills + handoff) | [agentes-cursor.md](agentes-cursor.md) |

## Ordem obrigatória de trabalho

1. Classificar risco e características de qualidade, com [templates/avaliacao-de-risco.md](templates/avaliacao-de-risco.md).
2. Identificar cenários de negócio e de canal com [11-identificar-cenarios.md](11-identificar-cenarios.md) (ou a skill `identificar-cenarios-teste`).
3. Escrever condições e casos seguindo [05-como-escrever-um-teste.md](05-como-escrever-um-teste.md) (ou a skill `escrever-casos-do-padrao`).
4. Aplicar o complemento do canal em [06-como-testar-por-canal.md](06-como-testar-por-canal.md).
5. Gravar plano, casos e execução no Azure Test Plans.
6. Se automatizar, copiar o boilerplate de [automacao/](../../automacao/), implementar com a skill `implementar-automacao-teste` e revisar com `revisar-automacao-teste`.
7. Anexar evidência e fechar o relatório com [templates/relatorio-de-teste.md](templates/relatorio-de-teste.md).

Um caso que não passa por essa ordem não atende a norma, mesmo que o texto esteja bem escrito.
