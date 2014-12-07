//vendor
import angular from 'angular';
import 'ionic';
import 'angularfire';

//configs
import {mainConfigModule} from './config/main.config';
import {firebaseAuthentificationConfigModule} from './config/firebaseAuthentification.config'

//routes
import {dietRouteModule} from './routes/diet/diet.route';
import {trainingRouteModule} from './routes/training/training.route';
import {firebaseAuthenticationModule} from './components/firebaseAuthentication/firebaseAuthentication.module';

export let mainModule = angular.module('fatburnhub', [
  'ionic',
  'firebase',
  mainConfigModule.name,
  firebaseAuthentificationConfigModule.name,
  firebaseAuthenticationModule.name,
  dietRouteModule.name,
  trainingRouteModule.name
]);
