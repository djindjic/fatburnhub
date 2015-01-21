// exports.config = {
//   seleniumAddress: 'http://localhost:4444/wd/hub',
//   specs: ['spec.js'],
//   capabilities: {
//     browserName: 'chrome'
//   }
// };

exports.config = {
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  capabilities: {
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
  	'build': process.env.TRAVIS_BUILD_NUMBER
  },
  specs: ['spec.js'],
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  allScriptsTimeout: 99999,
  baseUrl: 'http://localhost:9000' //default test port with Yeoman is 127.0.0.1 (localhost)
};