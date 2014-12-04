import 'ionic';
import 'angularfire';
import angular from 'angular';
import {dietRouteModule} from './routes/diet/diet.route';
import {trainingRouteModule} from './routes/training/training.route';
import {mainConfigModule} from './config/main.config';
import {firebaseAuthenticationDirectiveModule} from './components/firebaseAuthentication/firebaseAuthentication.directive';

export let mainModule = angular.module('fatburnhub', [
  'ionic',
  'firebase',
  mainConfigModule.name,
  firebaseAuthenticationDirectiveModule.name,
  dietRouteModule.name,
  trainingRouteModule.name
]).run(['$rootScope', function($rootScope) {
    $rootScope.firebaseRef = new Firebase('https://fatburnhub.firebaseio.com');
}]);