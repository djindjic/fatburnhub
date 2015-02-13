import template from './home.template.html!text';
import angular from 'angular';

export let homeRouteModule = angular.module('homeRouteModule', [
  'ui.router'
]).config([
  '$stateProvider',
  function homeRoute($stateProvider) {
    $stateProvider.state('home', {
      url: '/',
      template: template,
    });
  }
]);
