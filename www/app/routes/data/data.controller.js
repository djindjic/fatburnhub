import angular from 'angular';
import {Person} from 'metabolicjs';
import 'angular-messages';
import fbhFirebaseUtil from 'fbh-firebase-util';
import {Container} from 'aurelia-dependency-injection';

export let dataControllerModule = angular.module('dataControllerModule', [
  'ngMessages'
]);

dataControllerModule.controller('DataController', ['$scope', 'fbhFirebaseRef', 'currentUser', 'currentPerson', function ($scope, fbhFirebaseRef, currentUser, currentPerson) {
  let ctrl = this;

  let container = new Container();
  ctrl.person = container.get(Person);
  ctrl.person = currentPerson;

  ctrl.savePerson = function() {
    if (currentUser) {
      fbhFirebaseRef.ref('persons').child(currentUser.uid).set(ctrl.person);
    }
  }
}]);
