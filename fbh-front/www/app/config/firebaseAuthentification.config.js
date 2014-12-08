import angular from 'angular';
import {firebaseAuthenticationModule} from 'app/components/firebaseAuthentication/firebaseAuthentication.module';

export let firebaseAuthentificationConfigModule = angular.module('firebaseAuthentificationConfigModule', [
  firebaseAuthenticationModule.name
]);

//firebase module config
firebaseAuthentificationConfigModule.config(['fbsAuthProvider', function(fbsAuthProvider) {
  fbsAuthProvider.setAppName('fatburnhub');
}]);