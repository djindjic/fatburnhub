import angular from 'angular';

export let mainConfigModule = angular.module('mainConfigModule', []);

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