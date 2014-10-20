/* exported ApplicationConfiguration */
/* global ApplicationConfiguration:true */

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
  'use strict';
  
  // Init module configuration options
  var applicationModuleName = 'Gulpular';
  var applicationModuleVendorDependencies = ['ngRoute', 'ionic'];

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
  angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
    function($locationProvider) {
      $locationProvider.html5Mode(true).hashPrefix('!');
    }
  ]);

  //Then define the init function for starting up the application
  angular.element(document).ready(function() {
    //Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') window.location.hash = '#!';

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
    var vm = this;

      vm.a = 'about';
  }
})();
(function() {
  'use strict';

  angular
    .module('core')
    .controller('ContactCtrl', [ContactCtrl]);

  function ContactCtrl() {
    var vm = this;

      vm.a = 'contact gulp';
   }
})();
(function() {
  'use strict';

  angular
    .module('core')
    .controller('MainCtrl', MainCtrl);

  function MainCtrl() {
  }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZy5qcyIsImFwcC5qcyIsIm1vZHVsZXMvY29yZS9jb3JlLm1vZHVsZS5qcyIsIm1vZHVsZXMvY29yZS9jb25maWcvY29yZS5jb25maWcucm91dGVzLmpzIiwibW9kdWxlcy9jb3JlL2NvbnRyb2xsZXJzL2Fib3V0LmpzIiwibW9kdWxlcy9jb3JlL2NvbnRyb2xsZXJzL2NvbnRhY3QuanMiLCJtb2R1bGVzL2NvcmUvY29udHJvbGxlcnMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBleHBvcnRlZCBBcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb24gKi9cbi8qIGdsb2JhbCBBcHBsaWNhdGlvbkNvbmZpZ3VyYXRpb246dHJ1ZSAqL1xuXG4vLyBJbml0IHRoZSBhcHBsaWNhdGlvbiBjb25maWd1cmF0aW9uIG1vZHVsZSBmb3IgQW5ndWxhckpTIGFwcGxpY2F0aW9uXG52YXIgQXBwbGljYXRpb25Db25maWd1cmF0aW9uID0gKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIFxuICAvLyBJbml0IG1vZHVsZSBjb25maWd1cmF0aW9uIG9wdGlvbnNcbiAgdmFyIGFwcGxpY2F0aW9uTW9kdWxlTmFtZSA9ICdHdWxwdWxhcic7XG4gIHZhciBhcHBsaWNhdGlvbk1vZHVsZVZlbmRvckRlcGVuZGVuY2llcyA9IFsnbmdSb3V0ZScsICdpb25pYyddO1xuXG4gIC8vIEFkZCBhIG5ldyB2ZXJ0aWNhbCBtb2R1bGVcbiAgdmFyIHJlZ2lzdGVyTW9kdWxlID0gZnVuY3Rpb24obW9kdWxlTmFtZSwgZGVwZW5kZW5jaWVzKSB7XG4gICAgLy8gQ3JlYXRlIGFuZ3VsYXIgbW9kdWxlXG4gICAgYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgZGVwZW5kZW5jaWVzIHx8IGFwcGxpY2F0aW9uTW9kdWxlVmVuZG9yRGVwZW5kZW5jaWVzKTtcblxuICAgIC8vIEFkZCB0aGUgbW9kdWxlIHRvIHRoZSBBbmd1bGFySlMgY29uZmlndXJhdGlvbiBmaWxlXG4gICAgYW5ndWxhci5tb2R1bGUoYXBwbGljYXRpb25Nb2R1bGVOYW1lKS5yZXF1aXJlcy5wdXNoKG1vZHVsZU5hbWUpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYXBwbGljYXRpb25Nb2R1bGVOYW1lOiBhcHBsaWNhdGlvbk1vZHVsZU5hbWUsXG4gICAgYXBwbGljYXRpb25Nb2R1bGVWZW5kb3JEZXBlbmRlbmNpZXM6IGFwcGxpY2F0aW9uTW9kdWxlVmVuZG9yRGVwZW5kZW5jaWVzLFxuICAgIHJlZ2lzdGVyTW9kdWxlOiByZWdpc3Rlck1vZHVsZVxuICB9O1xufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvL1N0YXJ0IGJ5IGRlZmluaW5nIHRoZSBtYWluIG1vZHVsZSBhbmQgYWRkaW5nIHRoZSBtb2R1bGUgZGVwZW5kZW5jaWVzXG4gIGFuZ3VsYXIubW9kdWxlKEFwcGxpY2F0aW9uQ29uZmlndXJhdGlvbi5hcHBsaWNhdGlvbk1vZHVsZU5hbWUsIEFwcGxpY2F0aW9uQ29uZmlndXJhdGlvbi5hcHBsaWNhdGlvbk1vZHVsZVZlbmRvckRlcGVuZGVuY2llcyk7XG5cbiAgLy8gU2V0dGluZyBIVE1MNSBMb2NhdGlvbiBNb2RlXG4gIGFuZ3VsYXIubW9kdWxlKEFwcGxpY2F0aW9uQ29uZmlndXJhdGlvbi5hcHBsaWNhdGlvbk1vZHVsZU5hbWUpLmNvbmZpZyhbJyRsb2NhdGlvblByb3ZpZGVyJyxcbiAgICBmdW5jdGlvbigkbG9jYXRpb25Qcm92aWRlcikge1xuICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpLmhhc2hQcmVmaXgoJyEnKTtcbiAgICB9XG4gIF0pO1xuXG4gIC8vVGhlbiBkZWZpbmUgdGhlIGluaXQgZnVuY3Rpb24gZm9yIHN0YXJ0aW5nIHVwIHRoZSBhcHBsaWNhdGlvblxuICBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIC8vRml4aW5nIGZhY2Vib29rIGJ1ZyB3aXRoIHJlZGlyZWN0XG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoID09PSAnI189XycpIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJyMhJztcblxuICAgIC8vVGhlbiBpbml0IHRoZSBhcHBcbiAgICBhbmd1bGFyLmJvb3RzdHJhcChkb2N1bWVudCwgW0FwcGxpY2F0aW9uQ29uZmlndXJhdGlvbi5hcHBsaWNhdGlvbk1vZHVsZU5hbWVdKTtcbiAgfSk7XG59KSgpOyIsIkFwcGxpY2F0aW9uQ29uZmlndXJhdGlvbi5yZWdpc3Rlck1vZHVsZSgnY29yZScpOyIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdjb3JlJykuY29uZmlnKFsnJHJvdXRlUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XG4gICAgICAkcm91dGVQcm92aWRlclxuICAgICAgICAud2hlbignLycsIHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ21haW4uaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ01haW5DdHJsJ1xuICAgICAgICB9KVxuICAgICAgICAud2hlbignL2Fib3V0Jywge1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYWJvdXQuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ0Fib3V0Q3RybCdcbiAgICAgICAgfSlcbiAgICAgICAgLndoZW4oJy9jb250YWN0Jywge1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnY29udGFjdC5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnQ29udGFjdEN0cmwnXG4gICAgICAgIH0pXG4gICAgICAgIC5vdGhlcndpc2Uoe1xuICAgICAgICAgIHJlZGlyZWN0VG86ICcvJ1xuICAgICAgICB9KTtcbiAgICB9XG4gIF0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgnY29yZScpXG4gICAgLmNvbnRyb2xsZXIoJ0Fib3V0Q3RybCcsIFtBYm91dEN0cmxdKTtcblxuICBmdW5jdGlvbiBBYm91dEN0cmwoKSB7XG4gICAgdmFyIHZtID0gdGhpcztcblxuICAgICAgdm0uYSA9ICdhYm91dCc7XG4gIH1cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ2NvcmUnKVxuICAgIC5jb250cm9sbGVyKCdDb250YWN0Q3RybCcsIFtDb250YWN0Q3RybF0pO1xuXG4gIGZ1bmN0aW9uIENvbnRhY3RDdHJsKCkge1xuICAgIHZhciB2bSA9IHRoaXM7XG5cbiAgICAgIHZtLmEgPSAnY29udGFjdCBndWxwJztcbiAgIH1cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ2NvcmUnKVxuICAgIC5jb250cm9sbGVyKCdNYWluQ3RybCcsIE1haW5DdHJsKTtcblxuICBmdW5jdGlvbiBNYWluQ3RybCgpIHtcbiAgfVxufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=