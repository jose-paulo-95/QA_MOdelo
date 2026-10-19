# Práticas de Cypress neste boilerplate

Guia de quem escreve ou revisa a suíte Cypress do core bancário. Cada arquivo trata de um tema. A norma que manda, quando houver dúvida, é [08-padrao-cypress.md](../../../docs/padrao-qualidade/08-padrao-cypress.md).

Cypress aqui cobre a interface web de produto que **já** usa Cypress. Suíte nova de interface nasce em Playwright. App nativo não se prova com este boilerplate.

## Por onde começar

1. [01. Estrutura](./01-estrutura.md) — pastas, `baseUrl`, fixture, scripts
2. [02. Organização](./02-organizacao.md) — um `TC-` por `it`, camadas, independência
3. [03. Seletores](./03-seletores.md) — o que entra na page
4. [04. Comandos e esperas](./04-comandos-e-esperas.md) — alias, comprovante visível, o que não esperar
5. [05. Asserções](./05-assercoes.md) — o Então do caso
6. [06. Qualidade](./06-qualidade.md) — massa, segredo, o que não entra no Git
7. [07. Pipeline e revisão](./07-pipeline-e-revisao.md) — `@regressao`, evidência, checklist

O exemplo vivo é a transferência interna: page, flow e spec em `cypress/`.
