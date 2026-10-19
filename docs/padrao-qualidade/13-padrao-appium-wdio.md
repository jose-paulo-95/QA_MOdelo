# Padrão de automação de app nativo — Appium 2 + WebdriverIO (TypeScript)

## Por que esta ferramenta

| Critério | Appium 2 + WebdriverIO | Maestro | Detox |
|---|---|---|---|
| iOS e Android no mesmo padrão | Sim | Sim | Foco em React Native |
| Mesma linguagem do Playwright (TS) | Sim | Fluxos em YAML | JS/TS, mas outro modelo |
| Page / flow / spec como no boilerplate web | Sim | Limitado | Parcial |
| Integração com nuvem (BrowserStack, etc.) | Madura | Boa | Mais local/CI do app |
| Adequação a core bancário multi-stack | Alta | Alta para jornada simples | Só se o app for RN |

**Padrão oficial de app nativo neste projeto:** Appium 2 + WebdriverIO em TypeScript.  
Maestro ou Detox só com exceção na norma (produto já padronizado neles).

Playwright e Cypress **não** substituem este padrão para app de loja / binário instalado.

## 1. Quando se aplica

- App iOS e/ou Android que o cliente ou o operador instala.
- Jornadas N1–N6 do [11-identificar-cenarios.md](11-identificar-cenarios.md) marcadas para automatizar.
- A regra de negócio **continua** coberta pela API (Playwright). O app prova gestos, segundo plano, permissão e comprovante na UI.

Não use Appium para: API pura, mobile web no Safari/Chrome do site, nem carga (k6).

## 2. Estrutura no repositório do produto

Copie [automacao/appium-wdio/](../../automacao/appium-wdio/).

```text
tests/mobile/
  apps/                 # .apk / .ipa de homologação (ou baixar no CI; não commit de binário grande se a política proibir)
  specs/
  screens/              # equivalente a pages
  flows/
  support/
    data/
    caps/
wdio.shared.conf.ts
wdio.android.conf.ts
wdio.ios.conf.ts
package.json
```

## 3. Nomenclatura

- Spec: `<modulo>.android.spec.ts` / `<modulo>.ios.spec.ts` ou um arquivo com `describe` por plataforma via capability.
- Título: `TC-CORE-TRF-020 cliente conclui transferencia no app @regressao`.
- Screen: `<Nome>Screen` (ex.: `TransferenciaScreen`).
- Flow: verbo de negócio, `transferirValorNoApp`.

Um `it` = um `TC-`.

## 4. Camadas

1. **Spec** — massa, chama flow, afirma oráculo (comprovante + consulta API quando possível).
2. **Flow** — jornada de negócio em gestos.
3. **Screen** — seletores e ações (`click`, `setValue`, `getText`). Sem seletor no spec.
4. **Data** — JSON sintético.
5. **Caps** — capabilities Android/iOS por ambiente (local, emulador, nuvem).

## 5. Seletores (ordem)

1. `accessibility id` / `content-desc` / `accessibilityIdentifier` estável, acordado com o time do app.
2. `resource-id` (Android) / identificador de acessibilidade (iOS).
3. Texto de negócio estável (com cuidado a i18n).
4. XPath só como último recurso e nunca absoluto frágil (`/XCUIElementTypeApplication/...` longo).

Coordenada (`touchAction` em pixel fixo) fica de fora do código novo, salvo mapa/canvas com justificativa no PR.

## 6. Esperas

Espere o elemento ou o estado (`waitForDisplayed`, `waitUntil` com condição de negócio).  
`browser.pause(ms)` fixo fica de fora do código novo.

## 7. Asserções e oráculo

- UI: comprovante com `transactionId` (ou equivalente) visível.
- Core: sempre que houver rede de homologação, consultar a API (mesmo client/contrato do Playwright ou `fetch`/`axios` no support) para saldo/lançamentos.
- Asserção só “tela abriu” não conta como automação do caso de risco financeiro.

## 8. Plataformas e dispositivos

| Ambiente | Uso |
|---|---|
| Emulador Android / Simulador iOS | Desenvolvimento do script e fumaça |
| Aparelho físico do parque | Regressão de R6 alto e N2/N3 |
| Nuvem (BrowserStack / similar) | CI sem device farm local |

Caps de CI não apontam para produção. Bundle id / app package de homologação.

## 9. Pipeline

- Job `mobile-android` e/ou `mobile-ios` no candidato a release quando R6 app estiver em escopo.
- Artefatos: vídeo/screenshot do WDIO + link no Test Run.
- Não bloqueia a mesma barra da API se o app não mudou; bloqueia quando o item mexe no app nativo.
- Teste instável: mesma regra M4 — sai da suíte que bloqueia no mesmo dia.

## 10. Independência e segredos

Cada teste parte de estado conhecido (login de massa ou deep link de homologação).  
Usuário/senha/token só em variável de ambiente.  
Biometria: usar toggle de homologação ou mock acordado com desenvolvimento — não depender de face/digital real no CI.

## 11. Relação com a pirâmide

```text
API Playwright (R1–R3)     ← regressão permanente da regra
App Appium (N1, N2, …)     ← poucas jornadas + interrupção
Manual pontual             ← aparelho novo, loja, permissão exótica
```
