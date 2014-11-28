import template from './diet.template.html!text';
import angular from "angular";

export var dietRouteModule = angular.module('dietRouteModule', [
  'ui.router'
]).config([
  '$stateProvider',
  function dietRoute($stateProvider) {
    $stateProvider.state('diet', {
      url: '/diet',
      template: template,
    });
  }
]);