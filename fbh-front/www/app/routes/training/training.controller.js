import angular from 'angular';
import {FIREBASE_URL} from 'app/constants/firebase-url.constant';

export let trainingControllerModule = angular.module('trainingControllerModule', []);

trainingControllerModule.controller('MyController', ['$scope', '$firebase', 'fbhFirebaseRef', function ($scope, $firebase, fbhFirebaseRef) {
	let sync  = $firebase(fbhFirebaseRef.child("data"));
	// download the data into a local object
	let syncObject = sync.$asObject();
	// synchronize the object with a three-way data binding
	// click on `index.html` above to see it used in the DOM!
	syncObject.$bindTo($scope, 'data');
}]);