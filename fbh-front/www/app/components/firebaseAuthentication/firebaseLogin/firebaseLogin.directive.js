import angular from 'angular';

export let firebaseLoginDirectiveModule = angular.module('firebaseLoginDirectiveModule', [])
.directive('firebaseLogin', function() {
  return {
    require: '^firebaseAuthentication',
    link: function(scope, element, attrs, firebaseAuthenticationCtrl) {
      console.log(arguments);
      element.bind('click', function() {
      	firebaseAuthenticationCtrl.login();
      });
    }
  }
})