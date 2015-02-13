import template from './diet.template.html!text';
import angular from 'angular';
import {dietControllerModule} from './diet.controller';
import 'angular-ui-router';

export let dietRouteModule = angular.module('dietRouteModule', [
  'ui.router',
  dietControllerModule.name
]).config([
  '$stateProvider',
  function dietRoute($stateProvider) {
    $stateProvider.state('diet', {
      url: '/diet',
      data: {
        'selectedTab': 0
      },
      template: template,
      controller: 'DietController',
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
