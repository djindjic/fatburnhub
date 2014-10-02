(function() {
	'use strict';

	angular
	  .module('core')
	  .controller('ContactCtrl', [ContactCtrl]);

	function ContactCtrl() {
	  	this.a = 'contact';
	  }
})();