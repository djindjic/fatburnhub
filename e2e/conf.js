exports.config = {
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  // capabilities: {
  //   'browserName': 'chrome',
  //   'chromeOptions': {
  //       args: ['--test-type']
  //   }
  // },
  //baseUrl: 'http://localhost:9000'
  capabilities: {
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
  	build: "1",
    platformName: 'iOS',
    platformVersion: '7.1',
    browserName: '',
    app: 'safari',
    deviceName: 'iPhone Simulator',
    'appium-version': '1.2.1'
  },
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,

  specs: ['spec.js'],
  allScriptsTimeout: 99999,
};