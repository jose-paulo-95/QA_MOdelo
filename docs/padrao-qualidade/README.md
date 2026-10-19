# Padrão de Qualidade de Software

Padrão único para os QAs do core bancário. A [norma](01-norma.md) diz o que é obrigatório. Os guias dizem o passo a passo. As skills do Cursor executam esse passo a passo quando o QA pede.

**Escopo:** produtos do core e canais que alteram, consultam ou integram saldo, lançamento, cadastro mestre, tarifa, contrato externo ou trilha de auditoria. Obrigatório para QA, desenvolvimento que automatiza teste e quem aprova release.

**Método de origem.** Este padrão não reproduz os syllabi nem a ISO. Em conflito entre hábito local e a norma, prevalece a norma até revisão formal.

| Referência | Arquivo |
|---|---|
| ISTQB CTFL 4.0 | [syllabus_ctfl_4.0br.pdf](../../syllabus_ctfl_4.0br.pdf) |
| ISTQB CTAL-TA 4.0 | [syllabus_ctal-ta_4.0br.pdf](../../syllabus_ctal-ta_4.0br.pdf) |
| ISTQB CTAL-TM 3.0 | [syllabus_ctal-tm_3.0br.pdf](../../syllabus_ctal-tm_3.0br.pdf) |
| ISTQB CTAL-TAE 2.0 | [syllabus_ctal-tae_2.0br.pdf](../../syllabus_ctal-tae_2.0br.pdf) |
| ISTQB CTAL-AT v2.0 | [syllabus_ctal-at_v2.0br.pdf](../../syllabus_ctal-at_v2.0br.pdf) |
| ISO/IEC 25010:2023 | Modelo de qualidade; uso operacional em [02-modelo-de-qualidade-e-modelagem.md](02-modelo-de-qualidade-e-modelagem.md) |

Termos únicos (prefixos, classes, canais, severidade, M1–M4): [glossário das skills](../../.cursor/skills/_shared/glossario-padrao.md).

## O que o padrão considera

### Princípios

1. Teste informa risco de produção, com evidência rastreável.
2. Profundidade segue classe de risco e característica de qualidade. Preferência pessoal não escolhe técnica, ferramenta nem lugar de armazenamento.
3. Cada artefato tem um único lugar oficial ([03-testware-e-ferramentas.md](03-testware-e-ferramentas.md)). Planilha, pasta pessoal e wiki solta deixam de ser oficiais.
4. Regra de risco alto é revisada antes da codificação. Condição nasce no refinamento. Caso de baixo nível existe antes da execução.
5. Interface automatizada não substitui teste de API em serviço de core. Playwright e Cypress não provam app nativo.
6. Dado de teste é sintético ou mascarado. Dado real de cliente e extrato de produção não entram em caso, script, fixture ou print.
7. Outro QA revisa casos e scripts de R1, R2, R3 e R4 antes da execução contar como aceite.

### Risco e qualidade

Marque uma ou mais classes em toda demanda. Risco alto, nas métricas, é R1, R2 ou R3.

| Classe | Nome |
|---|---|
| R1 | Financeiro e contábil |
| R2 | Regulatório e trilha |
| R3 | Integração externa |
| R4 | Acesso e segurança da transação |
| R5 | Continuidade |
| R6 | Canal e interação |

Quando a mudança move valor, cadastro mestre ou contrato, o escopo inclui correção e completude funcional, integridade, autenticidade, responsabilização, não repúdio, confidencialidade, tolerância a falhas, recuperabilidade e interoperabilidade. Desempenho, escalabilidade, instalabilidade, capacidade de interação e safety entram só quando o risco pede. Glossário 2011→2023: usabilidade vira capacidade de interação; portabilidade vira flexibilidade.

Técnicas mínimas, pirâmide e oráculo: [02-modelo-de-qualidade-e-modelagem.md](02-modelo-de-qualidade-e-modelagem.md). A regressão permanente de R1–R3 mora na API. A interface cobre poucas jornadas, não cadastro campo a campo. Oráculo de movimento financeiro fecha débito, crédito e identificador único. “Sistema responde com sucesso” não é oráculo de core.

### Artefatos e onde vivem

| Prefixo | O que é |
|---|---|
| `CT-` | Condição de teste (Dado/Quando/Então) |
| `TC-` | Caso de baixo nível, com passos e oráculo |
| `CHE-` | Charter exploratório |
| `CHU-` | Charter de usabilidade |
| `TC-...-PERF` | Caso irmão de desempenho (k6) |

Formato: `CT-<PRODUTO>-<MODULO>-<NNN>` e o mesmo para `TC-`. Placeholder de produto nos exemplos: `CORE`.

| Artefato | Lugar oficial |
|---|---|
| Avaliação de risco | Anexo do item de trabalho |
| Plano, condição, caso, charter | Azure Test Plans, ligado ao item |
| Execução e evidência de aceite | Test Run |
| Defeito | Azure Boards, ligado ao caso |
| Script | Git do produto |
| Relatório do pipeline | Artefato do Azure Pipelines, com link no Test Run |
| Norma, guias e templates | Este repositório |

Severidade de defeito: `bloqueante`, `critico`, `alto`, `medio`, `baixo`. Severidade de review de caso ou código: bloqueante (rejeitado), importante (corrigir antes do merge ou da execução), sugestão (dívida opcional).

### Canais e ferramenta

A regra de negócio fica na API. A jornada fica no canal. Coluna Automatizar da identificação: `api`, `ui`, `appium`, `k6`, `manual`, `nao`.

| Canal | Automação no padrão |
|---|---|
| API / contrato | Playwright (`tests/api`) |
| Web, mobile web, Electron | Playwright (`tests/e2e`). Cypress só em produto que já usa Cypress |
| App nativo iOS/Android | Appium 2 + WebdriverIO (`tests/mobile`) |
| Desktop nativo / terminal | Manual. Outra ferramenta só com exceção |
| Batch / job / arquivo | Caso manual; janela de tempo com k6 quando a avaliação marcar |
| Usabilidade | Charter, sem framework |
| Carga, pico, stress, resistência | k6 (`tests/performance`), sob demanda, nunca em produção |

Terceira ferramenta de interface, suíte de API paralela à do Playwright, repositório de teste fora do Git do produto ou dispensa de caso de risco alto exigem exceção no item: motivo, prazo e aprovador.

### Métricas e saída de release

| Código | O que decide |
|---|---|
| M1 | Riscos altos executados na build candidata (esperado: 100% ou desvio aceito) |
| M2 | Defeito bloqueante ou crítico escapado depois da release (esperado: 0) |
| M3 | Regressão automatizada dos riscos altos (esperado: verde) |
| M4 | Instabilidade da suíte oficial que bloqueia (esperado: 0; flaky sai da suíte no mesmo dia) |

A release pode ser recomendada quando os casos das classes em escopo foram executados na build (ou há desvio aceito), não há defeito crítico ou bloqueante aberto na mudança, a regressão dos riscos altos está verde e o relatório aponta características exercitadas, não exercitadas e o motivo. Número sem fonte no Test Run, no pipeline ou nos defeitos não entra no relatório.

### Automação

Automatize neste ciclo só quando a regra permanece, o resultado é determinístico e o nível certo é API ou uma jornada curta. Deixe manual, com motivo no caso, quando a tela muda a cada refinamento, quando o oráculo é julgamento humano, quando o canal é desktop nativo ou terminal, ou quando o app ainda não tem suíte Appium (registre a dívida).

Regras comuns do boilerplate: um teste = um `TC-` no título; camadas spec → flow → page/screen/client → data; oráculo de negócio; massa sintética; segredo só em variável de ambiente; sem espera de milissegundos fixos em código novo.

## Por onde começar

| Situação | Documento |
|---|---|
| Entender a regra e o que bloqueia uma release | [01-norma.md](01-norma.md) |
| Saber o que testar no core e qual técnica usar | [02-modelo-de-qualidade-e-modelagem.md](02-modelo-de-qualidade-e-modelagem.md) |
| Saber onde guardar plano, caso, script e evidência | [03-testware-e-ferramentas.md](03-testware-e-ferramentas.md) |
| Implantar o padrão num produto | [04-guia-de-adocao.md](04-guia-de-adocao.md) |
| Escrever um caso, do risco até a evidência | [05-como-escrever-um-teste.md](05-como-escrever-um-teste.md) |
| Complemento de API, desktop, mobile ou usabilidade | [06-como-testar-por-canal.md](06-como-testar-por-canal.md) |
| Automatizar API, web, mobile web ou Electron | [07-padrao-playwright.md](07-padrao-playwright.md) |
| Automatizar web em produto que já usa Cypress | [08-padrao-cypress.md](08-padrao-cypress.md) e o guia [automacao/cypress/docs/LEIA-ME.md](../../automacao/cypress/docs/LEIA-ME.md) |
| Teste de carga com k6 | [09-padrao-k6.md](09-padrao-k6.md) |
| Captar, ler e agir sobre M1–M4 | [10-metricas.md](10-metricas.md) |
| Identificar cenários por tipo de aplicação (API, web, desktop, mobile web, app nativo, batch, usabilidade) | [11-identificar-cenarios.md](11-identificar-cenarios.md) |
| Checklist de revisão de automação | [12-checklist-revisao-automacao.md](12-checklist-revisao-automacao.md) |
| App nativo iOS/Android | [13-padrao-appium-wdio.md](13-padrao-appium-wdio.md) |
| Código inicial Playwright, Cypress, Appium e k6 | [automacao/README.md](../../automacao/README.md) |
| Copiar um modelo em branco | [templates/LEIA-ME.md](templates/LEIA-ME.md) |
| Skills, rules e handoff no Cursor | [agentes-cursor.md](agentes-cursor.md) |

Templates, na ordem de uso: [avaliação de risco](templates/avaliacao-de-risco.md), [identificação de cenários](templates/identificacao-de-cenarios.md), [plano](templates/plano-de-teste.md), [caso](templates/caso-de-teste.md), [charter exploratório](templates/charter-exploratorio.md), [charter de usabilidade](templates/charter-usabilidade.md), [defeito](templates/defeito.md), [relatório](templates/relatorio-de-teste.md).

## Ordem obrigatória de trabalho

1. Classificar R1–R6 e as características 25010 com [templates/avaliacao-de-risco.md](templates/avaliacao-de-risco.md).
2. Identificar cenários de negócio e de canal com [11-identificar-cenarios.md](11-identificar-cenarios.md) (skill `identificar-cenarios-teste`). Saída: tabela incluir/adiar/automatizar e `HANDOFF_IDENTIFICACAO`.
3. Escrever condições `CT-` e casos `TC-` com [05-como-escrever-um-teste.md](05-como-escrever-um-teste.md) (skill `escrever-casos-do-padrao`). Saída: `HANDOFF_CASOS`.
4. Aplicar o complemento do canal em [06-como-testar-por-canal.md](06-como-testar-por-canal.md). Se o fluxo for novo ou R6/capacidade de interação estiver marcado, acrescentar charter `CHE-` ou `CHU-`. Charter não substitui caso de R1.
5. Revisar os casos (skill `revisar-casos-teste`). Em R1–R4, outro QA revisa antes do aceite. Sem `TC-` revisado, não se codifica.
6. Publicar plano, condições e casos no Azure Test Plans, ligados ao item. Critério de entrada: comportamento observável, risco preenchido, ambiente e build, massa sintética e casos de baixo nível das classes em escopo.
7. Automatizar só quando o passo 7 de [05-como-escrever-um-teste.md](05-como-escrever-um-teste.md) autorizar. Copiar o boilerplate em [automacao/](../../automacao/), implementar com `implementar-automacao-teste` no padrão 07, 08, 09 ou 13 e revisar com `revisar-automacao-teste` e [12-checklist-revisao-automacao.md](12-checklist-revisao-automacao.md).
8. Executar na build candidata, anexar prova do oráculo e abrir defeito com [templates/defeito.md](templates/defeito.md) quando falhar.
9. Fechar [templates/relatorio-de-teste.md](templates/relatorio-de-teste.md) com M1–M4 lidas em [10-metricas.md](10-metricas.md) (skill `gerar-relatorio-metricas`). Lacuna de número impede o veredito “Recomendo seguir”.

Um caso que não passa por essa ordem não atende a norma, mesmo que o texto esteja bem escrito.

Fluxo das skills, como chamar e boas práticas: [agentes-cursor.md](agentes-cursor.md). Rules que disparam o fluxo no Cursor: `qualidade-identificar-cenarios`, `qualidade-casos-e-relatorio` e `qualidade-automacao`, em `.cursor/rules/`.
