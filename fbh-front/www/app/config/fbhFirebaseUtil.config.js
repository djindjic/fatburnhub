import angular from 'angular';
import fbhFirebaseUtil from 'fbh-firebase-util';

export let fbhFirebaseUtilConfigModule = angular.module('fbhFirebaseUtilConfigModule', [
  fbhFirebaseUtil.name
]);

fbhFirebaseUtilConfigModule.config(['fbhFirebaseAuthenticationProvider', function(fbhFirebaseAuthenticationProvider) {
  fbhFirebaseAuthenticationProvider.setAppName('fatburnhub');
}]);