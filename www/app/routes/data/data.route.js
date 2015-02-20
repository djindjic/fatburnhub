import angular from 'angular';
import 'angular-ui-router';
import template from './data.template.html!text';
import {baseRouteModule} from 'app/routes/base.route';
import {dataControllerModule} from './data.controller';

export let dataRouteModule = angular.module('dataRouteModule', [
  'ui.router',
  baseRouteModule.name,
  dataControllerModule.name
]).config(['$stateProvider', function dataRoute($stateProvider) {
    $stateProvider.state('base.data', {
      url: '/data',
      data: {
        'selectedTab': 1
      },
      template: template,
      controller: 'DataController',
      controllerAs: 'data'
    });
  }
]);
