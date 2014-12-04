import angular from 'angular';

export let firebaseLogoutDirectiveModule = angular.module('firebaseLogoutDirectiveModule', [])
.directive('firebaseLogout', function() {
  return {
    require: '^firebaseAuthentication',
    link: function(scope, element, attrs, firebaseAuthenticationCtrl) {
      console.log(arguments);
      element.bind('click', function() {
      	firebaseAuthenticationCtrl.logout();
      });
    }
  }
})