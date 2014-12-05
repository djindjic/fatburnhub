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
]);

mainModule.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
  var ref = new Firebase("https://fatburnhub.firebaseio.com/");
  return $firebaseAuth(ref);
}]);