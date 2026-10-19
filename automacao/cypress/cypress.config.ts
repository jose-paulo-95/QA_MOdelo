import { defineConfig } from 'cypress';
import { plugin as cypressGrepPlugin } from '@cypress/grep/plugin';

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://homolog.exemplo.local',
    specPattern: 'cypress/e2e/specs/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    video: true,
    screenshotOnRunFailure: true,
    testIsolation: true,
    retries: { runMode: 0, openMode: 0 },
    setupNodeEvents(_on, config) {
      cypressGrepPlugin(config);
      return config;
    },
  },
  env: {
    // Segredos via CYPRESS_TOKEN_TITULAR no pipeline — não commitar valores
  },
});
