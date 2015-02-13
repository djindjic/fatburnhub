import angular from 'angular';
import 'angular-ui-router';
import {currentUserModule} from 'app/services/currentUser/currentUser.service';

//import {authRequiredComponentModule} from 'app/components/auth-required/auth-required.directive';

export let authRequiredRouteModule = angular.module('authRequiredRouteModule', [
  'ui.router',
  currentUserModule.name,
]).config([
  '$stateProvider',
  function authRequiredRoute($stateProvider) {

    $stateProvider.state('authRequired', {
      abstract: true,
      views: {
        '': {
          template: '<ui-view></ui-view>'
        }
      }
    });

  }
]);
