//vendor
import angular from 'angular';
import 'angular-ui-router';

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

export let mainModule = angular.module('fatburnhub', [
  'mockLoginModule',
  mainConstantModule.name,
  angularMaterialConfigModule.name,
  mainConfigModule.name,
  fbhFirebaseUtilConfigModule.name,
  planRouteModule.name,
  dataRouteModule.name
]).run(['mocklogin', function(mocklogin) {
	console.log(mocklogin());
}]);

var mockLogin = angular.module('mockLoginModule', []);
mockLogin.factory('mocklogin', function() {
  var mocklogin = function() {
    return 'mocked login'
  };
  return mocklogin;
});
