/** Capabilities de homologação — ajuste package/activity e caminho do APK. */
export const androidCaps = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Android Emulator',
  'appium:app': process.env.ANDROID_APP || './tests/mobile/apps/app-homolog.apk',
  'appium:appPackage': process.env.ANDROID_APP_PACKAGE || 'br.exemplo.banco.homolog',
  'appium:appActivity': process.env.ANDROID_APP_ACTIVITY || '.MainActivity',
  'appium:noReset': false,
  'appium:newCommandTimeout': 240,
};
