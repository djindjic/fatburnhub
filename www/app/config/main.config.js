import angular from 'angular';
import 'angular-ui-router';

export let mainConfigModule = angular.module('mainConfigModule', [
  'ui.router'
]);

//webapp location config
if(document.location.protocol !== "file:") {
  var script = document.createElement('base');
  script.href = '/';

  document.getElementsByTagName('head')[0].appendChild(script);

  mainConfigModule.config(['$locationProvider',
    function($locationProvider) {
      $locationProvider.html5Mode(true).hashPrefix('!');
    }
  ]);
}

//always reload route resolve
mainConfigModule.config(['$provide', function($provide) {
  $provide.decorator('$state', ['$delegate', function($delegate) {
      var originalTransitionTo = $delegate.transitionTo;
      $delegate.transitionTo = function(to, toParams, options) {
        return originalTransitionTo(to, toParams, angular.extend({
          reload: true
        }, options));
      };
      return $delegate;
    }]
  );
}]);

mainConfigModule.run([
  '$rootScope', '$state',
  function($rootScope, $state) {
    $rootScope.$on('rootScope:UserLoggedIn', function userLoggedIn(event, authData) {
      $state.go('base.data');
    });
    $rootScope.$on('rootScope:UserLoggedOut', function userLoggedIn(event, authData) {
      $state.go('base.data');
    });
  }
]);
