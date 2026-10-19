import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const baseURL = process.env.BASE_URL;
if (!baseURL) {
  throw new Error('BASE_URL não definida. Copie .env.example para .env');
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'api',
      testMatch: /api\/specs\/.*\.spec\.ts/,
      use: { baseURL },
    },
    {
      name: 'desktop',
      testMatch: /e2e\/specs\/.*\.desktop\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1366, height: 768 },
      },
    },
    {
      name: 'mobile',
      testMatch: /e2e\/specs\/.*\.mobile\.spec\.ts/,
      use: { ...devices['Pixel 7'] },
    },
  ],
});
