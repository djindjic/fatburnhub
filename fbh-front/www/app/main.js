import 'ionic';
import 'angularfire';
import {FIREBASE_URL} from './constants/firebase-url';
import angular from 'angular';
import {dietRouteModule} from './routes/diet/diet.route';
import {trainingRouteModule} from './routes/training/training.route';
import {mainConfig} from './config/main.config';

export let mainModule = angular.module('fatburnhub', [
  'ionic',
  'firebase',
  mainConfig.name,
  dietRouteModule.name,
  trainingRouteModule.name
]);

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainModule.name]);
});