(function() {
	'use strict';

	angular
	  .module('core')
	  .controller('AboutCtrl', [AboutCtrl]);

	function AboutCtrl() {
	  	this.a = 'about new fatburnhub.com';
	  }
})();