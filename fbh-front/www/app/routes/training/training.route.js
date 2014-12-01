import template from './training.template.html!text';
import angular from "angular";
import {trainingControllerModule} from './training.controller';

export var trainingRouteModule = angular.module('trainingRouteModule', [
  'ui.router',
  trainingControllerModule.name
]).config([
  '$stateProvider',
  function trainingRoute($stateProvider) {
    $stateProvider.state('training', {
      url: '/training',
      template: template,
    });
  }
]);