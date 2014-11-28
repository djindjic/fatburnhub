import template from './training.template.html!text';

export var trainingRouteModule = angular.module('trainingRouteModule', [
  'ui.router'
]).config([
  '$stateProvider',
  function trainingRoute($stateProvider) {
    $stateProvider.state('training', {
      url: '/training',
      template: template,
    });
  }
]);