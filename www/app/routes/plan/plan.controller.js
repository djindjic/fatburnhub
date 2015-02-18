import angular from 'angular';
import {Person} from 'metabolicjs';
import fbhFirebaseUtil from 'fbh-firebase-util';

export let planControllerModule = angular.module('planControllerModule', []);

planControllerModule.controller('planController', ['$scope', 'fbhFirebaseRef', 'currentUser', function ($scope, fbhFirebaseRef, currentUser) {
	let ctrl = this;

	console.log(currentUser);

	FB.api(
		"/me",
		{
			access_token: currentUser.facebook.accessToken
		},
		function (response) {
			console.log(response);
			if (response && !response.error) {

			}
		}
	);

	ctrl.person = currentUser;

	// let syncObject = fbhFirebaseRef.syncObject('data');
  //   angular.element(document.querySelector('#loader')).attr('style', 'display: block')
	// syncObject.$bindTo($scope, 'data').then(function(){
	//     angular.element(document.querySelector('#loader')).attr('style', 'display: none')
	// });

	let prs = new Person();
	prs.age = 35;
	console.log(prs.age);
}]);
