import angular from 'angular';
import fbhFirebaseUtil from 'fbh-firebase-util';

export let currentUserModule = angular.module('currentUserModule', [
  fbhFirebaseUtil.name
]).factory('CurrentUser', [
  '$q', 'fbhFirebaseCurrenUserService', 'fbhFirebaseRef',
  function CurrentUser($q, fbhFirebaseCurrenUserService, fbhFirebaseRef) {
    function get() {
      var deferred = $q.defer();

      fbhFirebaseCurrenUserService.getCurrentUser().then(function(user) {
        deferred.resolve(
          user
        );
      });

      return deferred.promise;
    }

    function person() {
      var deferred = $q.defer();

      this.get().then(function(user) {
        if (user) {
          fbhFirebaseRef.ref(`persons/${user.uid}`).on('value', function(snapshot) {
            deferred.resolve(
              snapshot.val()
            );
          });
        } else {
          deferred.reject(null);
        }
      });

      return deferred.promise;
    }

    return {
      get: get,
      person: person
    };
  }
]);
