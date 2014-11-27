import "ionic";
import "angularfire";
import ApplicationConfiguration from "src/application_configuration";

angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies)

angular.module('core').config(function($stateProvider, $urlRouterProvider){
      // For any unmatched url, send to /route1
      $urlRouterProvider.otherwise("/about")
      
      $stateProvider
        // state('main', {
        //     url: "/",
        //     templateUrl: "about.html"
        // })

        .state('about', {
            url: "/about",
            templateUrl: "about.html"
        })
          
        .state('contact', {
            url: "/contact",
            templateUrl: "contact.html"
        })
    });

angular.module('core').run(function($templateCache) {
  $templateCache.put('about.html', 'about');
  $templateCache.put('contact.html', 'contact');
  $templateCache.put('main.html', 'main');
});

angular.module('core').controller('MyController', ['$scope', '$firebase', function ($scope, $firebase) {
	var ref = new Firebase("https://fatburnhub.firebaseio.com/data");
    var sync = $firebase(ref);
	  // download the data into a local object
	  var syncObject = sync.$asObject();
	  // synchronize the object with a three-way data binding
	  // click on `index.html` above to see it used in the DOM!
	  syncObject.$bindTo($scope, "data");
}]);

angular.module("core").config(['$locationProvider',
    function($locationProvider) {
      $locationProvider.html5Mode(true).hashPrefix('!');
    }
  ]);


//System.import("src/modules/core/core.module");
//System.import("src/modules/core/config/core.config.routes");
angular.element(document).ready(function() {
  angular.bootstrap(document, ["core"]);
});