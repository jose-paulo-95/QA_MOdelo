# Testware e ferramentas

Cada artefato tem um lugar. Cópia em pasta pessoal, planilha ou chat deixa de ser versão oficial no dia em que o caso entra no fluxo.

| Artefato | Lugar oficial |
|---|---|
| Avaliação de risco | Anexo do item de trabalho, a partir de [templates/avaliacao-de-risco.md](templates/avaliacao-de-risco.md) |
| Plano da release ou da iteração | Azure Test Plans |
| Condição e caso manual | Azure Test Plans, ligado ao item de trabalho |
| Execução e evidência de aceite | Test Run do Azure Test Plans |
| Defeito | Azure Boards, ligado ao caso |
| Script Playwright, Cypress e k6 | Git do produto, pastas abaixo |
| Relatório do pipeline | Artefato do Azure Pipelines, com link no Test Run |
| Norma e guias | Este repositório, pasta `docs/padrao-qualidade` |

Planilha local, pasta pessoal e wiki solta deixam de ser repositório oficial de teste.

## Pastas no Git do produto

```text
tests/
  api/                 # Playwright — contrato e API de core
  e2e/                 # Playwright — jornadas web
  mobile/              # Appium + WDIO — app nativo iOS/Android
  performance/         # k6
  support/data/        # massa sintética
cypress/               # só quando o produto já usa Cypress
  e2e/
  support/
  fixtures/
```

Detalhe de camadas e nomenclatura: [07-padrao-playwright.md](07-padrao-playwright.md), [08-padrao-cypress.md](08-padrao-cypress.md) e [09-padrao-k6.md](09-padrao-k6.md).

Código inicial para copiar ao produto: [automacao/](../../automacao/). Checklist de PR: [12-checklist-revisao-automacao.md](12-checklist-revisao-automacao.md).

## Azure Test Plans

1. Um plano por release ou por iteração do produto. Nome: `<produto> <release ou sprint>`.
2. Suítes por módulo e, dentro delas, separação por canal: API, Web, Desktop, Mobile, Usabilidade, Desempenho.
3. O caso usa os campos do [templates/caso-de-teste.md](templates/caso-de-teste.md). O ID `TC-` vai no título.
4. Configuração de execução registra ambiente e build.
5. Caso automatizado guarda o caminho do spec no campo de automação ou na discussão fixa do caso. O status passa a automatizado só quando o teste está na suíte do pipeline.

## Escolha da ferramenta

| Necessidade | Ferramenta |
|---|---|
| API funcional do core | Playwright, [07-padrao-playwright.md](07-padrao-playwright.md) |
| Interface web nova | Playwright |
| Interface web de produto que já tem suíte Cypress | Cypress, [08-padrao-cypress.md](08-padrao-cypress.md) |
| Mobile web | Projeto mobile do Playwright. Viewport do Cypress só no produto Cypress |
| Electron | Playwright |
| Desktop nativo / terminal | Execução manual no Test Plans. Outra ferramenta só com exceção da norma |
| App nativo iOS / Android | Appium 2 + WebdriverIO, [13-padrao-appium-wdio.md](13-padrao-appium-wdio.md) |
| Carga, pico, stress, resistência | k6, [09-padrao-k6.md](09-padrao-k6.md) |
| Usabilidade | Charter no Test Plans, sem framework |

Terceira ferramenta de interface exige exceção com prazo. Duas suítes de API para a mesma regra também exigem exceção: a oficial é a do Playwright, salvo o período de transição descrito no padrão Cypress.

## Pipeline

- Merge do serviço roda a suíte de API do módulo alterado.
- Candidato a release roda API de regressão dos riscos altos e a jornada de interface marcada como regressão.
- k6 de carga roda sob demanda, no ambiente autorizado, nunca em produção.
- Falha da suíte que bloqueia release segura o candidato até correção ou desvio aceito pelo aprovador.

## Dados e segredos

Massa sintética versionada em `tests/support/data` ou `cypress/fixtures`. Token, senha e URL ficam em variável do pipeline. O spec referencia o nome da variável. Quem encontrar dado real de cliente no Git remove, rotaciona o que for credencial e registra o incidente no item de trabalho.
