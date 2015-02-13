import angular from 'angular';
import fbhFirebaseUtil from 'fbh-firebase-util';

export let currentUserModule = angular.module('currentUserModule', [
  fbhFirebaseUtil.name
]).factory('CurrentUser', [
  '$q', 'fbhFirebaseCurrenUserService',
  function CurrentUser($q, fbhFirebaseCurrenUserService) {
    function get() {
      var deferred = $q.defer();

      fbhFirebaseCurrenUserService.getCurrentUser().then(function(user) {
        deferred.resolve(
          user
        );
      });

      return deferred.promise;
    }

    return {
      get: get
    };
  }
]);
