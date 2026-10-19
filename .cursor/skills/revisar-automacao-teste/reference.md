# Referência — revisar automação

Use este catálogo para classificar achados. Exemplos de código **ruim** = rejeitar ou ressalvar; **bom** = padrão em `automacao/`.

---

## 1. Catálogo de anti-padrões (todas as ferramentas)

| Anti-padrão | Severidade | Correção |
|---|---|---|
| Título sem `TC-` | Bloqueante | Renomear: `TC-... efeito` |
| Dois cenários no mesmo `test`/`it` | Bloqueante | Separar arquivos/testes |
| Só `toBeVisible` / “sucesso” / HTTP 200 como oráculo de R1 | Bloqueante | Assert saldo/lançamentos/status domínio |
| Token/senha/URL com credencial no código | Bloqueante | Env + rotacionar segredo |
| `waitForTimeout` / `cy.wait(ms)` / `browser.pause` | Bloqueante | Esperar condição de negócio |
| CPF, nome ou extrato real em fixture | Bloqueante | Massa sintética; remover do Git |
| Playwright/Cypress como prova de app nativo | Bloqueante | Appium ou manual honesto |
| k6 sem `thresholds` | Bloqueante | Meta numérica no script |
| Capability/app apontando produção | Bloqueante | Homologação |
| Seletor CSS/XPath no spec | Importante | Mover para page/screen |
| `page.goto('https://ambiente...')` hardcoded | Importante | `baseURL` / env |
| Sem client/page/screen (tudo no spec) | Importante | Extrair camadas |
| `it.skip` / `test.skip` de R1 sem desvio | Importante | Remover skip ou registrar desvio |
| Mesma regra API em Cypress e Playwright | Importante | Uma suíte oficial (Playwright) |
| XPath absoluto longo / nth-child frágil | Importante | accessibility id / role / testid |
| Coordenada x,y | Importante/Bloqueante | Seletor estável (bloqueante se for único meio) |
| Retry CI alto para esconder flake | Importante | Quarentena M4 |
| Nome de arquivo fora do padrão | Sugestão | `modulo.canal.spec.ts` |
| Expect sem mensagem | Sugestão | Mensagem do efeito |

---

## 2. O que validar em cada leitura de arquivo

### Spec / teste
1. Título e grep `TC-`
2. Quantidade de casos por bloco
3. Imports: usa flow/client/page?
4. Asserts finais: o que prova?
5. Waits e sleeps
6. Dados literais suspeitos (token, CPF)

### Page / Screen / Client
1. Seletores na ordem do padrão (role → label → testid → accessibility id)
2. Métodos com nome de negócio (`confirmar`, `transferir`) vs `click1`
3. Sem assert de negócio pesado (assert fica no spec) — page pode ter wait de elemento

### Flow
1. Orquestra pages/screens; não mistura HTTP de contrato complexo sem client
2. Reutilizável por mais de um TC-

### Data / fixture
1. Só sintético
2. Sem senha; senha via nome de env (`senhaEnv`)

### Caps / config (mobile, k6, playwright.config)
1. Ambiente homolog
2. Timeouts razoáveis (não 5min escondendo flake)
3. Projetos/matchers corretos

---

## 3. Validações por ferramenta

### Playwright
- [ ] Arquivo em `tests/api/specs` ou `tests/e2e/specs` com sufixo `.api|.desktop|.mobile.spec.ts`
- [ ] Projeto coerente com o path
- [ ] `requireEnv` para segredo
- [ ] Jornada web: oráculo API complementar se R1
- [ ] Sem `waitForTimeout`

### Cypress
- [ ] `*.cy.ts` em `cypress/e2e/specs`
- [ ] Page/flow em `support`
- [ ] Sem `cy.wait(número)`
- [ ] Se há `cy.request` de regra já coberta no Playwright → importante (duplicidade)

### Appium WDIO
- [ ] `tests/mobile/specs`
- [ ] Screens com `~` accessibility preferencialmente
- [ ] `support/api` para R1
- [ ] Sem `browser.pause` / tap em pixel
- [ ] Caps via env; app package homolog

### k6
- [ ] `thresholds` presentes e falham o job
- [ ] Tag/nome `TC-...-PERF`
- [ ] `__ENV` para URL/token
- [ ] Idempotency-Key por iteração
- [ ] README ou comentário: ambiente autorizado ≠ produção

---

## 4. Flaky (M4) — como revisar

Sinais:
- `retries: 3`+ só nesse teste
- sleep “porque às vezes falha”
- seletor de texto traduzido / horário
- dependência de ordem

Ação na revisão: **Importante/Bloqueante** — não mergear na suíte que bloqueia; orientar quarentena + issue de dívida.

---

## 5. Exemplos de achados bem escritos

| Severidade | Arquivo | Problema | Correção | Regra |
|---|---|---|---|---|
| Bloqueante | `transferencia.desktop.spec.ts:12` | Assert só `heading` Comprovante | Consultar lançamentos via API com transactionId | 07 §8 / checklist oráculo |
| Importante | `transferencia.web.cy.ts:8` | `cy.get('.sc-abc')` no spec | Mover para page + data-testid | 08 §5 |
| Bloqueante | `login.screen.ts:4` | Senha `'123456'` no código | `requireEnv('APP_SENHA_HML')` | Norma dado/segredo |

---

## 6. Veredito — regras de decisão

- Qualquer **bloqueante** → Rejeitado; não pode bloquear release (M3).
- Só **importantes** → Aprovado com ressalvas; merge após correção.
- Só **sugestões** → Aprovado.
- Flaky conhecido na suíte que bloqueia → tratar como bloqueante para M3 até quarentenar.
