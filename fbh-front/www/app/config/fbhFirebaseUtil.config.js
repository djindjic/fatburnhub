import angular from 'angular';
import fbhFirebaseUtil from 'fbh-firebase-util';

export let fbhFirebaseUtilConfigModule = angular.module('fbhFirebaseUtilConfigModule', [
  fbhFirebaseUtil.name
]);

fbhFirebaseUtilConfigModule.config(['fbhFirebaseRefProvider', 'FIREBASE_APP_NAME', function(fbhFirebaseRefProvider, FIREBASE_APP_NAME) {
  fbhFirebaseRefProvider.setAppName(FIREBASE_APP_NAME);
}]);