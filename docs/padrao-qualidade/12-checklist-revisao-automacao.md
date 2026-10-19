# Checklist de revisão de automação

Usada por humanos e pela skill `revisar-automacao-teste`. Um item bloqueante marca o PR como rejeitado para a suíte que bloqueia release.

## Playwright / Cypress (funcional)

- [ ] Título do teste começa com `TC-...` e descreve o efeito
- [ ] Um caso `TC-` por `test` / `it`
- [ ] Spec não contém seletor CSS/XPath solto (está em page) nem URL absoluta de ambiente
- [ ] Client (API) ou page (UI) + flow quando há jornada
- [ ] Oráculo de negócio: saldo, lançamentos, status de domínio ou equivalente — não só HTTP 200 / “visível”
- [ ] Massa sintética em fixture/data; sem CPF/nome/extrato real
- [ ] Segredo só via env (`requireEnv`, `Cypress.env`, variável de pipeline)
- [ ] Sem `waitForTimeout` / `cy.wait(ms)` fixo
- [ ] Seletores: role/label/testid (Playwright) ou `data-testid` estável (Cypress)
- [ ] Independência: não depende da ordem de outro teste no arquivo
- [ ] Arquivo no caminho padrão (`tests/api|e2e` ou `cypress/e2e/specs`)
- [ ] Tag `@regressao` só se for suíte que bloqueia release
- [ ] API de core em Playwright quando a suíte nova for Playwright (não duplicar regra no Cypress)

## Appium + WebdriverIO (app nativo)

- [ ] Título do teste começa com `TC-...`
- [ ] Um `TC-` por `it`
- [ ] Spec sem seletor solto (está em `screens/`)
- [ ] Accessibility id / resource-id preferidos; sem coordenada fixa em código novo
- [ ] Sem `browser.pause(ms)` fixo
- [ ] Oráculo de UI (comprovante) **e** API de core quando R1 (via `support/api`)
- [ ] Caps apontam para app/package de homologação, não produção
- [ ] Segredo só em env; biometria via toggle/mock de homologação
- [ ] Arquivo em `tests/mobile/specs/`
- [ ] Não declara cobertura de app nativo com Playwright/Cypress

## k6

- [ ] Meta numérica em `thresholds` (não só no README)
- [ ] Tag / nome com `TC-...-PERF` ou ID de desempenho
- [ ] `BASE_URL` e token via `__ENV`
- [ ] Ambiente não é produção
- [ ] Check mínimo de contrato (`status`, `transactionId` ou equivalente)
- [ ] Massa por VU sem colidir na mesma conta indevidamente
- [ ] Idempotency-Key única por iteração (salvo ensaio de chave repetida)

## Instabilidade (M4)

- [ ] Não há retry mascarando flake na suíte que bloqueia sem issue de dívida
- [ ] Teste conhecido flaky está fora do job que bloqueia release
