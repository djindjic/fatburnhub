var capabilities = [
  {
    base: 'SauceLabs',
    browserName: 'firefox',
    platform: 'Linux',
    version: '35'
  },
  {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'OS X 10.10',
    version: '8'
  },
  {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11'
  }
];

var configuration = {
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  multiCapabilities: [{
    'browserName': 'chrome',
    'chromeOptions': {
        args: ['--test-type']
    }
  }],

  specs: ['spec.js'],

  jasmineNodeOpts: {
    onComplete: null,
    isVerbose: true,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 360000
  },
};
if(process.env.TRAVIS){
  configuration.multiCapabilities = capabilities;
  configuration.sauceUser = process.env.SAUCE_USERNAME;
  configuration.sauceKey = process.env.SAUCE_ACCESS_KEY;
} else {
  configuration.baseUrl = 'http://localhost:3474';
}

exports.config = configuration;