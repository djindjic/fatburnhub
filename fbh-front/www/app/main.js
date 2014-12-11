//vendor
import angular from 'angular';
import 'ionic';
import 'angularfire';
import 'angular-material';
import fbhFirebaseUtil from 'fbh-firebase-util';

//constants
import {mainConstantModule} from './constants/main.constant';

//configs
import {mainConfigModule} from './config/main.config';
import {fbhFirebaseUtilConfigModule} from './config/fbhFirebaseUtil.config'

// //routes
import {dietRouteModule} from './routes/diet/diet.route';
import {trainingRouteModule} from './routes/training/training.route';

export let mainModule = angular.module('fatburnhub', [
  'ionic',
  'firebase',
  'ngMaterial',
  fbhFirebaseUtil.name,
  mainConstantModule.name,
  mainConfigModule.name,
  fbhFirebaseUtilConfigModule.name,
  dietRouteModule.name,
  trainingRouteModule.name
]).run();
