import 'ionic';
import 'angularfire';
import angular from 'angular';
import {dietRouteModule} from './routes/diet/diet.route';
import {trainingRouteModule} from './routes/training/training.route';
import {mainConfigModule} from './config/main.config';
import {loginDirectiveModule} from './components/login/login.directive';

export let mainModule = angular.module('fatburnhub', [
  'ionic',
  'firebase',
  mainConfigModule.name,
  loginDirectiveModule.name,
  dietRouteModule.name,
  trainingRouteModule.name
]);