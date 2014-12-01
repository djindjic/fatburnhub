import angular from 'angular';

export let mainConfig = angular.module('main-config', []);

if(document.location.protocol !== "file:") {
  var script = document.createElement('base');
  script.href = '/';    

  document.getElementsByTagName('head')[0].appendChild(script);

  mainConfig.config(['$locationProvider',
    function($locationProvider) {
      $locationProvider.html5Mode(true).hashPrefix('!');
    }
  ]);
}