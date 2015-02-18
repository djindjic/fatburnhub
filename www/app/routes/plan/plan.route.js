import angular from 'angular';
import 'angular-ui-router';
import {planControllerModule} from './plan.controller';
import template from './plan.template.html!text';
import {baseRouteModule} from 'app/routes/base.route';

export let planRouteModule = angular.module('planRouteModule', [
  'ui.router',
  baseRouteModule.name,
  planControllerModule.name
]).config(['$stateProvider', function planRoute($stateProvider) {
    $stateProvider.state('base.plan', {
      url: '/',
      data: {
        'selectedTab': 0
      },
      template: template,
      controller: 'planController',
      controllerAs: 'plan'
    });
  }
]);
