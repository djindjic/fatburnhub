import angular from 'angular';
import {Person} from 'metabolicjs';
import fbhFirebaseUtil from 'fbh-firebase-util';

export let planControllerModule = angular.module('planControllerModule', []);

planControllerModule.controller('PlanController', ['$scope', 'currentUser', 'currentPerson', function ($scope, currentUser, currentPerson) {
	let ctrl = this;

	ctrl.person = currentPerson;
}]);
