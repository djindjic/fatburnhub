import template from './firebaseAuthentication.template.html!text';
import angular from 'angular';
// import {firebaseAuthenticationControllerModule} from './firebaseAuthentication.controller';
import {firebaseLoginDirectiveModule} from './firebaseLogin/firebaseLogin.directive';
import {firebaseLogoutDirectiveModule} from './firebaseLogout/firebaseLogout.directive';

export let firebaseAuthenticationDirectiveModule = angular.module('firebaseAuthenticationDirectiveModule', [
  // firebaseAuthenticationControllerModule.name,
  // firebaseLoginDirectiveModule.name,
  // firebaseLogoutDirectiveModule.name
]);

firebaseAuthenticationDirectiveModule.directive('firebaseAuthenticationDirective', ['Auth', function(Auth) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
    },
    // controller: 'AuthenticationController',
    // controllerAs: 'fbsAuthCtrl',
    link: function(scope, element, attrs, ctrl, transclude) {
      Auth.$onAuth(function(authData) {
        scope.user = authData;
      });

      scope.login = function() {
        Auth.$authWithOAuthPopup("facebook").then(function(authData) {
          console.log("Logged in as:", authData.uid);
        }).catch(function(error) {
          console.error("Authentication failed: ", error);
        });
      };

      scope.logout = function() {
        Auth.$unauth();
        console.log("Logged out");
      }

      transclude(scope, function(clone, scope) {
        element.append(clone);
      });
    }
    // bindToController: true,
    // templateUrl: 'fbsAuth.template.html'
  }
}]);