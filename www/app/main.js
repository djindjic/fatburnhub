//vendor
import angular from 'angular';
import 'angular-ui-router';
import 'famous-angular';

//styles
import './styles/material.css!';

//constants
import {mainConstantModule} from './constants/main.constant';

//configs
import {mainConfigModule} from './config/main.config';
import {fbhFirebaseUtilConfigModule} from './config/fbhFirebaseUtil.config'
import {angularMaterialConfigModule} from './config/angularMaterial.config';

//routes
import {planRouteModule} from './routes/plan/plan.route';
import {dataRouteModule} from './routes/data/data.route';

//components
import {fbhMainTabsDirectiveModule} from './components/fbhMainTabs/fbhMainTabs.directive';

export let mainModule = angular.module('fatburnhub', [
  'famous.angular',
  'mockLoginModule',
  mainConstantModule.name,
  angularMaterialConfigModule.name,
  mainConfigModule.name,
  fbhFirebaseUtilConfigModule.name,
  planRouteModule.name,
  dataRouteModule.name,
  fbhMainTabsDirectiveModule.name
]).run(['mocklogin', function(mocklogin) {
	console.log(mocklogin());
}]);

mainModule.controller('MainCtrl', ['$scope', '$famous', '$timeout', function($scope, $famous, $timeout){
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var t = new Transitionable(0);

  function reset(){
    t.set(0);
    t.set(Math.PI * 2.0, {duration: 1750, curve: 'linear'}, function(){
      $timeout(reset);
    })
  }

  reset();

  $scope.getRotateY = function(){
    return t.get();
  }
}])

var mockLogin = angular.module('mockLoginModule', []);
mockLogin.factory('mocklogin', function() {
  var mocklogin = function() {
    return 'mocked login'
  };
  return mocklogin;
});
