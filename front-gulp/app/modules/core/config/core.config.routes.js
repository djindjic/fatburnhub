(function() {
  'use strict';

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
})();