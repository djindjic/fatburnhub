// exports.config = {
//   seleniumAddress: 'http://localhost:4444/wd/hub',
//   specs: ['spec.js'],
//   capabilities: {
//     browserName: 'chrome'
//   }
// };

exports.config = {
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  // capabilities: {
  //   'browserName': 'chrome',
  //   'chromeOptions': {
  //       args: ['--test-type']
  //   }
  // },
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
  specs: ['spec.js'],
  sauceUser: process.env.SAUCE_USER_NAME,
  sauceKey: process.env.SAUCE_API_KEY,
  //allScriptsTimeout: 99999,
  baseUrl: 'http://localhost:9000' //default test port with Yeoman is 127.0.0.1 (localhost)
};