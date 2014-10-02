// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	'use strict';
	
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
(function() {
	'use strict';

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
	  if (window.location.hash === '#_=_') window.location.hash = '#';

	  //Then init the app
	  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
	});
})();
ApplicationConfiguration.registerModule('core');
(function() {
  'use strict';

  angular.module('core').config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'main.html',
          controller: 'MainCtrl'
        })
        .when('/about', {
          templateUrl: 'about.html',
          controller: 'AboutCtrl'
        })
        .when('/contact', {
          templateUrl: 'contact.html',
          controller: 'ContactCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    }
  ]);
})();
(function() {
	'use strict';

	angular
	  .module('core')
	  .controller('AboutCtrl', [AboutCtrl]);

	function AboutCtrl() {
	  	this.a = 'about fatburnhub.com';
	  }
})();
(function() {
	'use strict';

	angular
	  .module('core')
	  .controller('ContactCtrl', [ContactCtrl]);

	function ContactCtrl() {
	  	this.a = 'contact';
	  }
})();
(function() {
	'use strict';

	angular
	  .module('core')
	  .controller('MainCtrl', MainCtrl);

	function MainCtrl() {
		var vm = this;
		
	  	this.name = 'a';
	  }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZy5qcyIsImFwcC5qcyIsIm1vZHVsZXMvY29yZS9jb3JlLm1vZHVsZS5qcyIsIm1vZHVsZXMvY29yZS9jb25maWcvY29yZS5jb25maWcucm91dGVzLmpzIiwibW9kdWxlcy9jb3JlL2NvbnRyb2xsZXJzL2Fib3V0LmpzIiwibW9kdWxlcy9jb3JlL2NvbnRyb2xsZXJzL2NvbnRhY3QuanMiLCJtb2R1bGVzL2NvcmUvY29udHJvbGxlcnMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW5pdCB0aGUgYXBwbGljYXRpb24gY29uZmlndXJhdGlvbiBtb2R1bGUgZm9yIEFuZ3VsYXJKUyBhcHBsaWNhdGlvblxudmFyIEFwcGxpY2F0aW9uQ29uZmlndXJhdGlvbiA9IChmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHRcblx0Ly8gSW5pdCBtb2R1bGUgY29uZmlndXJhdGlvbiBvcHRpb25zXG5cdHZhciBhcHBsaWNhdGlvbk1vZHVsZU5hbWUgPSAnZmF0YnVybmh1Yic7XG5cdHZhciBhcHBsaWNhdGlvbk1vZHVsZVZlbmRvckRlcGVuZGVuY2llcyA9IFsnbmdSb3V0ZSddO1xuXG5cdC8vIEFkZCBhIG5ldyB2ZXJ0aWNhbCBtb2R1bGVcblx0dmFyIHJlZ2lzdGVyTW9kdWxlID0gZnVuY3Rpb24obW9kdWxlTmFtZSwgZGVwZW5kZW5jaWVzKSB7XG5cdFx0Ly8gQ3JlYXRlIGFuZ3VsYXIgbW9kdWxlXG5cdFx0YW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgZGVwZW5kZW5jaWVzIHx8IGFwcGxpY2F0aW9uTW9kdWxlVmVuZG9yRGVwZW5kZW5jaWVzKTtcblxuXHRcdC8vIEFkZCB0aGUgbW9kdWxlIHRvIHRoZSBBbmd1bGFySlMgY29uZmlndXJhdGlvbiBmaWxlXG5cdFx0YW5ndWxhci5tb2R1bGUoYXBwbGljYXRpb25Nb2R1bGVOYW1lKS5yZXF1aXJlcy5wdXNoKG1vZHVsZU5hbWUpO1xuXHR9O1xuXG5cdHJldHVybiB7XG5cdFx0YXBwbGljYXRpb25Nb2R1bGVOYW1lOiBhcHBsaWNhdGlvbk1vZHVsZU5hbWUsXG5cdFx0YXBwbGljYXRpb25Nb2R1bGVWZW5kb3JEZXBlbmRlbmNpZXM6IGFwcGxpY2F0aW9uTW9kdWxlVmVuZG9yRGVwZW5kZW5jaWVzLFxuXHRcdHJlZ2lzdGVyTW9kdWxlOiByZWdpc3Rlck1vZHVsZVxuXHR9O1xufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvL1N0YXJ0IGJ5IGRlZmluaW5nIHRoZSBtYWluIG1vZHVsZSBhbmQgYWRkaW5nIHRoZSBtb2R1bGUgZGVwZW5kZW5jaWVzXG5cdGFuZ3VsYXIubW9kdWxlKEFwcGxpY2F0aW9uQ29uZmlndXJhdGlvbi5hcHBsaWNhdGlvbk1vZHVsZU5hbWUsIEFwcGxpY2F0aW9uQ29uZmlndXJhdGlvbi5hcHBsaWNhdGlvbk1vZHVsZVZlbmRvckRlcGVuZGVuY2llcyk7XG5cblx0Ly8gU2V0dGluZyBIVE1MNSBMb2NhdGlvbiBNb2RlXG5cdC8vIGFuZ3VsYXIubW9kdWxlKEFwcGxpY2F0aW9uQ29uZmlndXJhdGlvbi5hcHBsaWNhdGlvbk1vZHVsZU5hbWUpLmNvbmZpZyhbJyRsb2NhdGlvblByb3ZpZGVyJyxcblx0Ly8gICBmdW5jdGlvbigkbG9jYXRpb25Qcm92aWRlcikge1xuXHQvLyAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaGFzaFByZWZpeCgnIScpO1xuXHQvLyAgIH1cblx0Ly8gXSk7XG5cblx0Ly9UaGVuIGRlZmluZSB0aGUgaW5pdCBmdW5jdGlvbiBmb3Igc3RhcnRpbmcgdXAgdGhlIGFwcGxpY2F0aW9uXG5cdGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cdCAgLy9GaXhpbmcgZmFjZWJvb2sgYnVnIHdpdGggcmVkaXJlY3Rcblx0ICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2ggPT09ICcjXz1fJykgd2luZG93LmxvY2F0aW9uLmhhc2ggPSAnIyc7XG5cblx0ICAvL1RoZW4gaW5pdCB0aGUgYXBwXG5cdCAgYW5ndWxhci5ib290c3RyYXAoZG9jdW1lbnQsIFtBcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb24uYXBwbGljYXRpb25Nb2R1bGVOYW1lXSk7XG5cdH0pO1xufSkoKTsiLCJBcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb24ucmVnaXN0ZXJNb2R1bGUoJ2NvcmUnKTsiLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnY29yZScpLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJyxcbiAgICBmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xuICAgICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgICAgLndoZW4oJy8nLCB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdtYWluLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdNYWluQ3RybCdcbiAgICAgICAgfSlcbiAgICAgICAgLndoZW4oJy9hYm91dCcsIHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Fib3V0Lmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdBYm91dEN0cmwnXG4gICAgICAgIH0pXG4gICAgICAgIC53aGVuKCcvY29udGFjdCcsIHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2NvbnRhY3QuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ0NvbnRhY3RDdHJsJ1xuICAgICAgICB9KVxuICAgICAgICAub3RoZXJ3aXNlKHtcbiAgICAgICAgICByZWRpcmVjdFRvOiAnLydcbiAgICAgICAgfSk7XG4gICAgfVxuICBdKTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhclxuXHQgIC5tb2R1bGUoJ2NvcmUnKVxuXHQgIC5jb250cm9sbGVyKCdBYm91dEN0cmwnLCBbQWJvdXRDdHJsXSk7XG5cblx0ZnVuY3Rpb24gQWJvdXRDdHJsKCkge1xuXHQgIFx0dGhpcy5hID0gJ2Fib3V0IGZhdGJ1cm5odWIuY29tJztcblx0ICB9XG59KSgpOyIsIihmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXJcblx0ICAubW9kdWxlKCdjb3JlJylcblx0ICAuY29udHJvbGxlcignQ29udGFjdEN0cmwnLCBbQ29udGFjdEN0cmxdKTtcblxuXHRmdW5jdGlvbiBDb250YWN0Q3RybCgpIHtcblx0ICBcdHRoaXMuYSA9ICdjb250YWN0Jztcblx0ICB9XG59KSgpOyIsIihmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXJcblx0ICAubW9kdWxlKCdjb3JlJylcblx0ICAuY29udHJvbGxlcignTWFpbkN0cmwnLCBNYWluQ3RybCk7XG5cblx0ZnVuY3Rpb24gTWFpbkN0cmwoKSB7XG5cdFx0dmFyIHZtID0gdGhpcztcblx0XHRcblx0ICBcdHRoaXMubmFtZSA9ICdhJztcblx0ICB9XG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==