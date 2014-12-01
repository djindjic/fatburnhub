import angular from 'angular';
import {FIREBASE_URL} from 'app/constants/firebase-url';

export let trainingControllerModule = angular.module('trainingControllerModule', []);

trainingControllerModule.controller('MyController', ['$scope', '$firebase', function ($scope, $firebase) {
	var ref = new Firebase(`${FIREBASE_URL}/data`);
    var sync = $firebase(ref);
	// download the data into a local object
	var syncObject = sync.$asObject();
	// synchronize the object with a three-way data binding
	// click on `index.html` above to see it used in the DOM!
	syncObject.$bindTo($scope, 'data');
}]);