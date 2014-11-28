import template from './diet.template.html!text';

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