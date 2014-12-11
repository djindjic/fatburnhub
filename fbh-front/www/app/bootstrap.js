import {mainModule} from './main';

//start hack hammerjs
System.import('hammer').then(function(hammerjs) {
  window.Hammer = hammerjs;
});
//end hack

angular.element(document).ready(function() {
  angular.bootstrap(document.querySelector('[data-main-app]'), [
    mainModule.name
  ], {
    strictDi: true
  });
});
