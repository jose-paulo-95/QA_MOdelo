/** Capabilities de homologação — ajuste bundleId e caminho do .app/.ipa. */
export const iosCaps = {
  platformName: 'iOS',
  'appium:automationName': 'XCUITest',
  'appium:deviceName': process.env.IOS_DEVICE_NAME || 'iPhone 15',
  'appium:platformVersion': process.env.IOS_VERSION || '17.0',
  'appium:app': process.env.IOS_APP || './tests/mobile/apps/AppHomolog.app',
  'appium:bundleId': process.env.IOS_BUNDLE_ID || 'br.exemplo.banco.homolog',
  'appium:noReset': false,
  'appium:newCommandTimeout': 240,
};
