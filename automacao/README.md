# Boilerplate de automação (padrão QA)

Código inicial obrigatório para suítes novas do core bancário. Copie a pasta da ferramenta para o repositório do **produto** e ajuste URLs, massa e nomes de módulo.

| Pasta | Quando usar |
|---|---|
| [playwright/](playwright/) | API de core, web, mobile web, Electron |
| [cypress/](cypress/) | Produto que **já** usa Cypress |
| [appium-wdio/](appium-wdio/) | App nativo **iOS / Android** |
| [k6/](k6/) | Carga / pico / stress / resistência |

Normas: [07](../docs/padrao-qualidade/07-padrao-playwright.md), [08](../docs/padrao-qualidade/08-padrao-cypress.md), [09](../docs/padrao-qualidade/09-padrao-k6.md), [13](../docs/padrao-qualidade/13-padrao-appium-wdio.md).

## Regras comuns

1. Um teste automatizado = um caso `TC-...` no título.
2. Spec não contém seletor solto nem URL/capability de produção.
3. Oráculo de negócio (saldo, lançamento, `transactionId`) — não só “abriu a tela”.
4. Massa sintética; segredo só em variável de ambiente.
5. Sem pause/wait com milissegundos fixos em código novo.
6. Camadas: spec → flow → page/screen/client → data.

## Como começar num produto

```text
1. Copiar a pasta da ferramenta para o repo do produto
2. npm install (+ emulador/simulador se Appium; npx playwright install se Playwright)
3. Copiar .env.example → .env (nunca commitar .env)
4. Ajustar massa e capabilities / baseURL
5. Skill implementar-automacao-teste
6. Skill revisar-automacao-teste
```
