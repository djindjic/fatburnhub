import angular from 'angular';
import 'angular-ui-router';
import {currentUserModule} from 'app/services/currentUser/currentUser.service';

export let baseRouteModule = angular.module('baseRouteModule', [
  'ui.router',
  currentUserModule.name,
]).config([
  '$stateProvider',
  function authRequiredRoute($stateProvider) {

    $stateProvider.state('base', {
      abstract: true,
      views: {
        '': {
          template: '<ui-view></ui-view>'
        }
      },
      resolve: {
        currentUser: [
          'CurrentUser',
          function currentUserResolver(CurrentUser) {
            return CurrentUser.get();
          }
        ]
      }
    });

  }
]);
