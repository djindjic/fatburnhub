import angular from 'angular';
import {Person} from 'metabolicjs';

export let dietControllerModule = angular.module('dietControllerModule', []);

dietControllerModule.controller('MyControllerDiet', ['$scope', 'fbhFirebaseRef', function ($scope, fbhFirebaseRef) {
	let syncObject = fbhFirebaseRef.syncObject('data');
    angular.element(document.querySelector('#loader')).attr('style', 'display: block')
	syncObject.$bindTo($scope, 'data').then(function(){
	    angular.element(document.querySelector('#loader')).attr('style', 'display: none')
	});

	let prs = new Person();
	prs.age = 35;
	console.log(prs.age);
}]);