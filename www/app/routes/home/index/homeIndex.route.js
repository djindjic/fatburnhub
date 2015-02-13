import angular from 'angular';
import 'angular-ui-router';

import {authRequiredRouteModule} from 'app/routes/authRequired.route';
import template from './homeIndex.template.html!text';

export let homeIndexRouteModule = angular.module('homeIndexRouteModule', [
  'ui.router',
  authRequiredRouteModule.name
]).config([
  '$stateProvider',
  function homeRouteIndex($stateProvider) {
    $stateProvider.state('authRequired.home.index', {
      url: '/',
      template: template,
      data: {
        'selectedTab': 1
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
