var protractor = require('protractor');

var flow = protractor.promise.controlFlow();

function waitOne() {
  return protractor.promise.delayed(15000);
}

function sleep() {
  return flow.execute(waitOne);
}

describe('login', function() {
	it('shoud login', function() {
		browser.get('/');

		element(by.css('button[fbh-firebase-login=""]')).click();

		var handlesPromise = browser.getAllWindowHandles();

		handlesPromise
		.then(function(handles) {
		   return browser.switchTo().window(handles[1]);
		})
		.then(function(handle) {
		  browser.driver.findElement(by.id('email')).sendKeys(process.env.FACEBOOK_USER);
		  browser.driver.findElement(by.id('pass')).sendKeys(process.env.FACEBOOK_PASSWORD);
		  browser.driver.findElement(by.name('login')).click();
		});
		handlesPromise = browser.getAllWindowHandles();

		handlesPromise
		.then(function(handles) {
		   return browser.switchTo().window(handles[0]);
		})
		.then(function() {
		  expect(element(by.css('div[ng-show="fbsAuthCtrl.authentificated"]')).isDisplayed()).toBeTruthy();
		});
	});
});

describe('change great me text', function() {
  it('should add a todo', function() {
    browser.get('/');

    sleep();

    element(by.css('#tab2')).click();
    element(by.model('data.greetMe')).clear().sendKeys('protractor');

    element(by.css('#tab1')).click();
    expect(element(by.css('#greetResult')).getText()).toEqual('protractor');

    element(by.css('#tab2')).click();
    element(by.model('data.greetMe')).clear().sendKeys('facebook');
  });
});
