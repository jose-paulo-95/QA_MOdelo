# Glossário compartilhado — skills de qualidade

Fonte única para as skills. Não redefinir estes termos dentro de cada `SKILL.md`.

## Prefixos de artefato

| Prefixo | Significado |
|---|---|
| `CT-` | Condição de teste (Dado/Quando/Então) |
| `TC-` | Caso de teste de baixo nível (passos executáveis) |
| `CHE-` | Charter exploratório |
| `CHU-` | Charter de usabilidade |
| `TC-...-PERF` | Caso irmão de desempenho (k6) |

Formato sugerido: `CT-<PRODUTO>-<MODULO>-<NNN>` / `TC-<PRODUTO>-<MODULO>-<NNN>`. Placeholder de produto: `CORE` (avisar o usuário para alinhar).

## Classes de risco

| Classe | Nome | Exemplos |
|---|---|---|
| R1 | Financeiro e contábil | Saldo, lançamento, tarifa, estorno, conciliação |
| R2 | Regulatório e trilha | Autor, carimbo, imutabilidade |
| R3 | Integração externa | Contrato, timeout, retry, idempotência |
| R4 | Acesso e segurança da transação | Papel, alçada, outro titular |
| R5 | Continuidade | Queda no meio, reprocessamento |
| R6 | Canal e interação | Jornada humana, usabilidade |

R1–R3 em escopo: caso de baixo nível + revisão por outro QA. R1–R4: revisão humana antes do aceite.

## Características ISO/IEC 25010:2023 (uso no padrão)

| Uso | Características |
|---|---|
| Quase sempre (move valor/cadastro/contrato) | Correção/completude funcional; integridade, autenticidade, responsabilização, não repúdio, confidencialidade; tolerância a falhas; recuperabilidade; interoperabilidade |
| Sob demanda | Eficiência de desempenho/capacidade; escalabilidade; instalabilidade; capacidade de interação; safety (confirmação de ação irreversível) |

Glossário 2011→2023: usabilidade → capacidade de interação; portabilidade → flexibilidade.

## Canais

| Canal | Ferramenta de automação no padrão |
|---|---|
| API | Playwright (`tests/api`) |
| Web / mobile web / Electron | Playwright (`tests/e2e`); Cypress só legado |
| App nativo iOS/Android | Appium 2 + WebdriverIO (`tests/mobile`) |
| Desktop nativo / terminal | Manual |
| Usabilidade | Charter (manual) |
| Desempenho | k6 (`tests/performance`) |

## Coluna Automatizar (identificação)

`api` | `ui` | `appium` | `k6` | `manual` | `nao`

## Severidade de defeito (norma)

`bloqueante` | `critico` | `alto` | `medio` | `baixo`

## Severidade de review (código ou casos)

| Severidade | Efeito |
|---|---|
| Bloqueante | Rejeitado |
| Importante | Aprovado com ressalvas — corrigir antes do merge/execução |
| Sugestão | Aprovado; dívida opcional |

## Métricas M1–M4

| Código | Nome |
|---|---|
| M1 | Cobertura de execução dos riscos altos |
| M2 | Defeito bloqueante/crítico escapado |
| M3 | Regressão automatizada dos riscos altos (verde/vermelha) |
| M4 | Instabilidade da suíte oficial |

Detalhe: `docs/padrao-qualidade/10-metricas.md`.

## Fluxo das skills

```text
identificar-cenarios-teste
  → escrever-casos-do-padrao
  → revisar-casos-teste
  → implementar-automacao-teste
  → revisar-automacao-teste
  → gerar-relatorio-metricas
```
