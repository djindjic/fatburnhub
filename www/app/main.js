//vendor
import angular from 'angular';
import 'angular-ui-router';

//constants
import {mainConstantModule} from './constants/main.constant';

//configs
import {mainConfigModule} from './config/main.config';
import {fbhFirebaseUtilConfigModule} from './config/fbhFirebaseUtil.config'
import {angularMaterialConfigModule} from './config/angularMaterial.config'

//routes
import {dietRouteModule} from './routes/diet/diet.route';
import {trainingRouteModule} from './routes/training/training.route';

export let mainModule = angular.module('fatburnhub', [
  angularMaterialConfigModule.name,
  mainConstantModule.name,
  mainConfigModule.name,
  fbhFirebaseUtilConfigModule.name,
  dietRouteModule.name,
  trainingRouteModule.name
]).run();
