import angular from 'angular';
import 'angular-ui-router';
import template from './data.template.html!text';
import {baseRouteModule} from 'app/routes/base.route';

export let dataRouteModule = angular.module('dataRouteModule', [
  'ui.router',
  baseRouteModule.name
]).config(['$stateProvider', function dataRoute($stateProvider) {
    $stateProvider.state('base.data', {
      url: '/data',
      template: template,
      data: {
        'selectedTab': 1
      }
    });
  }
]);
