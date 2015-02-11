import angular from 'angular';
import {Person} from 'metabolicjs';

export let dietControllerModule = angular.module('dietControllerModule', []);

dietControllerModule.controller('MyControllerDiet', ['$scope', 'fbhFirebaseRef', 'fbhFirebaseCurrenUser', function ($scope, fbhFirebaseRef, fbhFirebaseCurrenUser) {
	fbhFirebaseCurrenUser.getCurrentUser().then(function(user) {
		console.log(user.facebook.displayName);
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