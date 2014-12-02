import template from './diet.template.html!text';
import angular from 'angular';
import {dietControllerModule} from './diet.controller';

export let dietRouteModule = angular.module('dietRouteModule', [
  'ui.router',
  dietControllerModule.name
]).config([
  '$stateProvider',
  function dietRoute($stateProvider) {
    $stateProvider.state('diet', {
      url: '/diet',
      template: template,
    });
  }
]);