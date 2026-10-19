import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://homolog.exemplo.local',
    specPattern: 'cypress/e2e/specs/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    video: true,
    screenshotOnRunFailure: true,
    retries: { runMode: 1, openMode: 0 },
  },
  env: {
    // Segredos via CYPRESS_TOKEN_TITULAR no pipeline — não commitar valores
  },
});
