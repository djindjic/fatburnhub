(function() {
	'use strict';

	angular
	  .module('core')
	  .controller('MainCtrl', MainCtrl);

	function MainCtrl() {
		var vm = this;
		
	  	this.name = 'a';
	  }
})();