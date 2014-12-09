//vendor
import angular from 'angular';
import 'ionic';
import 'angularfire';
import fbhFirebaseUtil from 'fbh-firebase-util';
console.log(fbhFirebaseUtil.name);

//configs
import {mainConfigModule} from './config/main.config';
import {fbhFirebaseUtilConfigModule} from './config/fbhFirebaseUtil.config'

// //routes
import {dietRouteModule} from './routes/diet/diet.route';
import {trainingRouteModule} from './routes/training/training.route';

export let mainModule = angular.module('fatburnhub', [
  'ionic',
  'firebase',
  fbhFirebaseUtil.name,
  mainConfigModule.name,
  fbhFirebaseUtilConfigModule.name,
  dietRouteModule.name,
  trainingRouteModule.name
]);
