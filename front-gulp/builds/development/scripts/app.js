'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'fatburnhub';
	var applicationModuleVendorDependencies = ['ngRoute'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || applicationModuleVendorDependencies);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
// angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
//   function($locationProvider) {
//     $locationProvider.hashPrefix('!');
//   }
// ]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_') window.location.hash = '#!';

  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
ApplicationConfiguration.registerModule('core');
angular.module('core').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'modules/core/templates/main.core.tpl.html',
        controller: 'MainCtrl'
      })
      .when('/home', {
        templateUrl: 'modules/core/templates/home.core.tpl.html',
        controller: 'HomeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
]);
angular.module('core')
  .controller('HomeCtrl', function ($scope) {
  	$scope.a = 'a';
  });
angular.module('core')
  .controller('MainCtrl', function ($scope) {
  	$scope.a = 'a';
  });
