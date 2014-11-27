import "ionic";
import angular from "angular";
import "firebase";
import "angularFire";
import ApplicationConfiguration from "src/application_configuration";

angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies)

.controller('MyController', ['$scope', '$firebase', function ($scope, $firebase) {
	var ref = new Firebase("https://fatburnhub.firebaseio.com/data");
    var sync = $firebase(ref);
	  // download the data into a local object
	  var syncObject = sync.$asObject();
	  // synchronize the object with a three-way data binding
	  // click on `index.html` above to see it used in the DOM!
	  syncObject.$bindTo($scope, "data");
}]);

angular.element(document).ready(function() {
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});