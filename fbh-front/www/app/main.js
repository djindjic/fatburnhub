import 'ionic';
import 'angularfire';
import angular from 'angular';
import {dietRouteModule} from './routes/diet/diet.route';
import {trainingRouteModule} from './routes/training/training.route';
import {mainConfig} from './config/main.config';
import {FIREBASE_URL} from 'app/constants/firebase-url';

export let mainModule = angular.module('fatburnhub', [
  'ionic',
  'firebase',
  mainConfig.name,
  dietRouteModule.name,
  trainingRouteModule.name
]);

mainModule.controller("loginCtrl", function($scope, $rootScope, $firebase) {

  var ref = new Firebase(FIREBASE_URL);
  ref.onAuth(function(authData) {
	  if (authData) {
	    // user authenticated with Firebase
	    console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
	  } else {
	    console.log("user is logged out");
	  }
	});

  // Logs a user in with inputted provider
  $scope.login = function(provider) {
    ref.authWithOAuthPopup("facebook", function(error, authData) {
    	console.log('controllerLogin');
    	if (authData) {
		    // the access token will allow us to make Open Graph API calls
		    console.log(authData.facebook.accessToken);
		  }
    }, {
	  remember: "sessionOnly",
	  scope: "email"
	});
  };
  $scope.logout = function(provider) {
    ref.unauth();
  };
});

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainModule.name]);
});
