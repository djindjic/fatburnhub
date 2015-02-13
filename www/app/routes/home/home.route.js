import template from './home.template.html!text';
import angular from 'angular';
import 'angular-ui-router';

import {homeIndexRouteModule} from './index/homeIndex.route';
import {authRequiredRouteModule} from 'app/routes/authRequired.route';

export let homeRouteModule = angular.module('homeRouteModule', [
  'ui.router',
  homeIndexRouteModule.name,
  authRequiredRouteModule.name
]).config([
  '$stateProvider',
  function homeRoute($stateProvider) {
    $stateProvider.state('authRequired.home', {
      abstract: true,
      template: '<ui-view></ui-view>'
    });
  }
]);
