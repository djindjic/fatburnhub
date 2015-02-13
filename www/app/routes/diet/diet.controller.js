import angular from 'angular';
import {Person} from 'metabolicjs';

export let dietControllerModule = angular.module('dietControllerModule', []);

dietControllerModule.controller('MyControllerDiet', ['$scope', 'fbhFirebaseRef', 'CurrentUser', function ($scope, fbhFirebaseRef, CurrentUser) {
	CurrentUser.get().then(function(name) {
		console.log(name.facebook.displayName);
	});
	let syncObject = fbhFirebaseRef.syncObject('data');
    angular.element(document.querySelector('#loader')).attr('style', 'display: block')
	syncObject.$bindTo($scope, 'data').then(function(){
	    angular.element(document.querySelector('#loader')).attr('style', 'display: none')
	});

	let prs = new Person();
	prs.age = 35;
	console.log(prs.age);
}]);
