'use strict';

angular.module('core', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'modules/core/views/main.core.view.html',
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
