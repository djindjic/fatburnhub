import angular from 'angular';

export let trainingControllerModule = angular.module('trainingControllerModule', []);

trainingControllerModule.controller('MyController', ['$scope', 'fbhFirebaseRef', function ($scope, fbhFirebaseRef) {
	let syncObject = fbhFirebaseRef.syncObject('data');
	angular.element(document.querySelector('#loader')).attr('style', 'display: block')
	syncObject.$bindTo($scope, 'data').then(function(){
	    angular.element(document.querySelector('#loader')).attr('style', 'display: none')
	});
}]);