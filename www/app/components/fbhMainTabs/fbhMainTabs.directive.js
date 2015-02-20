import angular from 'angular';
import template from './fbhMainTabs.template.html!text';

export let fbhMainTabsDirectiveModule = angular.module('fbhMainTabsDirectiveModule', []);

fbhMainTabsDirectiveModule.directive('fbhMainTabsDirective', [function() {
  return {
    restrict: 'E',
    scope: {},
    template: template,
    link: function(scope) {
      scope.$on('$stateChangeStart', function(event, toState){
        scope.selectedTab = toState.data.selectedTab;
      });
    }
  }
}]);
