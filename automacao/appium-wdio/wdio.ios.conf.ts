import { sharedConfig } from './wdio.shared.conf';
import { iosCaps } from './tests/mobile/support/caps/ios.caps';

export const config = {
  ...sharedConfig,
  capabilities: [iosCaps],
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
