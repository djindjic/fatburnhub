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



