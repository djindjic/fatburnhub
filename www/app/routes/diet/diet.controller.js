import angular from 'angular';
import {Person} from 'metabolicjs';

export let dietControllerModule = angular.module('dietControllerModule', []);

dietControllerModule.controller('MyControllerDiet', ['$scope', 'fbhFirebaseRef', function ($scope, fbhFirebaseRef) {
	let syncObject = fbhFirebaseRef.syncObject('data');
	syncObject.$bindTo($scope, 'data');

	console.log(new Person({yearOfBirth:1980}).yearOfBirth);
}]);