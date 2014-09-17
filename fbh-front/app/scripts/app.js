'use strict';

/**
 * @ngdoc overview
 * @name fbhFrontApp
 * @description
 * # fbhFrontApp
 *
 * Main module of the application.
 */
angular
  .module('fbhFrontApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
