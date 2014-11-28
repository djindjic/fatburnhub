import template from './training.template.html!text';
import angular from "angular";

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