import template from './firebaseAuthentication.template.html!text';
import angular from 'angular';
import {firebaseAuthenticationControllerModule} from './firebaseAuthentication.controller';
import {firebaseLoginDirectiveModule} from './firebaseLogin/firebaseLogin.directive';
import {firebaseLogoutDirectiveModule} from './firebaseLogout/firebaseLogout.directive';

export let firebaseAuthenticationDirectiveModule = angular.module('firebaseAuthenticationDirectiveModule', [
  firebaseAuthenticationControllerModule.name,
  firebaseLoginDirectiveModule.name,
  firebaseLogoutDirectiveModule.name
]);

firebaseAuthenticationDirectiveModule.directive('firebaseAuthentication', function() {
  return {
    restrict: 'AE',
    replace: true,
    transclude: true,
    scope: {
      firebaseRef: '&',
      user: '='
    },
    controller: 'FirebaseAuthenticationController',
    template: template
  }
});