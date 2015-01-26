var capabilities = require('./capabilities');

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
  configuration.multiCapabilities = Object.keys(capabilities).map(function (key) {
    return capabilities[key];
  });
  configuration.sauceUser = process.env.SAUCE_USERNAME;
  configuration.sauceKey = process.env.SAUCE_ACCESS_KEY;
} else {
  configuration.baseUrl = 'http://localhost:3474';
}

exports.config = configuration;