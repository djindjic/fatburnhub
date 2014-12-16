import angular from 'angular';

export let trainingControllerModule = angular.module('trainingControllerModule', []);

trainingControllerModule.controller('MyController', ['$scope', 'fbhFirebaseRef', function ($scope, fbhFirebaseRef) {
	let syncObject = fbhFirebaseRef.syncObject('data');
	syncObject.$bindTo($scope, 'data');
}]);