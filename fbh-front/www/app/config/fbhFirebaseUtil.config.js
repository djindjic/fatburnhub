import angular from 'angular';
import fbhFirebaseUtil from 'fbh-firebase-util';

export let fbhFirebaseUtilConfigModule = angular.module('fbhFirebaseUtilConfigModule', [
  fbhFirebaseUtil.name
]);

fbhFirebaseUtilConfigModule.config(['fbhFirebaseRefProvider', function(fbhFirebaseRefProvider) {
  fbhFirebaseRefProvider.setAppName('fatburnhub');
}]);