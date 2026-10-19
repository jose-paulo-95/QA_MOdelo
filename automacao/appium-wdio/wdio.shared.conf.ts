import dotenv from 'dotenv';
import type { Options } from '@wdio/types';

dotenv.config();

export const sharedConfig: Options.Testrunner = {
  runner: 'local',
  tsConfigPath: './tsconfig.json',
  specs: ['./tests/mobile/specs/**/*.spec.ts'],
  maxInstances: 1,
  logLevel: 'info',
  waitforTimeout: 15000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 2,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 180000,
  },
};
