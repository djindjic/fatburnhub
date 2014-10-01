(function() {
	'use strict';

	angular
	  .module('core')
	  .controller('HomeCtrl', ['$scope', HomeCtrl]);

	function HomeCtrl($scope) {
	  	$scope.a = 'a';
	  }
})();