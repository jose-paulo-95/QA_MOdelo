import { sharedConfig } from './wdio.shared.conf';
import { androidCaps } from './tests/mobile/support/caps/android.caps';

export const config = {
  ...sharedConfig,
  capabilities: [androidCaps],
  services: [
    [
      'appium',
      {
        args: {
          address: '127.0.0.1',
          port: 4723,
        },
      },
    ],
  ],
};
