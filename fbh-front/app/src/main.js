import "ionic";
import angular from "angular";

angular.module('ionicApp', ['ionic'])
      .controller('MyController', ['$scope', function ($scope) {
        $scope.greetMe = 'world';
      }]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ["ionicApp"]);
}); 