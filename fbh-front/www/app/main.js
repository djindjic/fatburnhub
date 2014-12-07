import 'ionic';
import 'angularfire';
import angular from 'angular';
import {dietRouteModule} from './routes/diet/diet.route';
import {trainingRouteModule} from './routes/training/training.route';
import {firebaseAuthenticationDirectiveModule} from './components/firebaseAuthentication/firebaseAuthentication.directive';
import {mainConfigModule} from './config/main.config';
import {firebaseAuthentificationConfigModule} from './config/firebaseAuthentification.config'

//System.import('./config/main.config');

export let mainModule = angular.module('fatburnhub', [
  'ionic',
  'firebase',
  mainConfigModule.name,
  firebaseAuthentificationConfigModule.name,
  firebaseAuthenticationDirectiveModule.name,
  dietRouteModule.name,
  trainingRouteModule.name
]);
