import 'ionic';
import 'angularfire';
import angular from "angular";
import {dietRouteModule} from './routes/diet/diet.route';
import {trainingRouteModule} from './routes/training/training.route';

var mainModule = angular.module('fatburnhub', [
  'ionic',
  'firebase',
  dietRouteModule.name,
  trainingRouteModule.name
])

angular.module('fatburnhub').controller('MyController', ['$scope', '$firebase', function ($scope, $firebase) {
	var ref = new Firebase('https://fatburnhub.firebaseio.com/data');
    var sync = $firebase(ref);
	  // download the data into a local object
	  var syncObject = sync.$asObject();
	  // synchronize the object with a three-way data binding
	  // click on `index.html` above to see it used in the DOM!
	  syncObject.$bindTo($scope, 'data');
}]);

// angular.module("fatburnhub").config(['$locationProvider',
//   function($locationProvider) {
//     $locationProvider.html5Mode(true).hashPrefix('!');
//   }
// ]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['fatburnhub']);
});