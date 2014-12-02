import template from './login.template.html!text';
import angular from 'angular';
import {loginControllerModule} from './login.controller';

export let loginDirectiveModule = angular.module('loginDirectiveModule', [
	loginControllerModule.name
])
.directive('login', function() {
  return {
    restrict: 'E',
    scope: {
	  firebaseUrl: '@firebaseUrl'
	},
    controller: 'LoginController',
    template: template
  };
})