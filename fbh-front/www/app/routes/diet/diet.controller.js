import angular from 'angular';
import {FIREBASE_URL} from 'app/constants/firebase-url.constant';

export let dietControllerModule = angular.module('dietControllerModule', []);

dietControllerModule.controller('MyControllerDiet', ['$scope', '$firebase', function ($scope, $firebase) {
	var ref = new Firebase(`${FIREBASE_URL}/data`);
    var sync = $firebase(ref);
	// download the data into a local object
	var syncObject = sync.$asObject();
	// synchronize the object with a three-way data binding
	// click on `index.html` above to see it used in the DOM!
	syncObject.$bindTo($scope, 'data');
}]);