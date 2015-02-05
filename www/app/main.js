//vendor
import angular from 'angular';
import 'angular-material';
import 'angular-ui-router';
import fbhFirebaseUtil from 'fbh-firebase-util';

//constants
import {mainConstantModule} from './constants/main.constant';

//configs
import {mainConfigModule} from './config/main.config';
import {fbhFirebaseUtilConfigModule} from './config/fbhFirebaseUtil.config'
import {angularMaterialConfigModule} from './config/angularMaterial.config'

// //routes
import {dietRouteModule} from './routes/diet/diet.route';
import {trainingRouteModule} from './routes/training/training.route';

export let mainModule = angular.module('fatburnhub', [
  'ngMaterial',
  fbhFirebaseUtil.name,
  angularMaterialConfigModule.name,
  mainConstantModule.name,
  mainConfigModule.name,
  fbhFirebaseUtilConfigModule.name,
  dietRouteModule.name,
  trainingRouteModule.name
]).run();
