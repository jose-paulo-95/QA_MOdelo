# Boilerplate Appium 2 + WebdriverIO

Automação de **app nativo** iOS/Android no padrão QA. Norma: [13-padrao-appium-wdio.md](../../docs/padrao-qualidade/13-padrao-appium-wdio.md).

## Pré-requisitos

- Node.js LTS
- Android SDK + emulador **ou** Xcode + simulador (macOS para iOS)
- Appium 2 drivers (instalados via `npm` deste pacote)

## Setup

```bash
cp .env.example .env
npm install
# coloque o APK/APP em tests/mobile/apps/ ou aponte ANDROID_APP / IOS_APP
npm run test:android
# npm run test:ios   # requer macOS + simulador
```

## Camadas

`specs` → `flows` → `screens` → `support/data` + `support/api` (oráculo).

Accessibility ids no exemplo (`~campo-usuario`) devem existir no app de homologação — alinhe com o time mobile (`content-desc` / `accessibilityIdentifier`).
