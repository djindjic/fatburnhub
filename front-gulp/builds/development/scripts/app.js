'use strict';

angular.module('core', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'modules/core/templates/main.core.tpl.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
angular.module('core')
  .controller('MainCtrl', function ($scope) {
  	$scope.a = 'a';
  });
