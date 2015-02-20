import angular from 'angular';
import 'angular-material';

export let angularMaterialConfigModule = angular.module('angularMaterialConfigModule', [
  'ngMaterial'
]);

angularMaterialConfigModule.config(['$mdThemingProvider', function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('amber')
    .accentPalette('light-green');
}]);
