System.config({
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js"
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.3.7",
    "angular-material": "github:angular/bower-material@0.6.1",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.13",
    "css": "github:systemjs/plugin-css@0.1.0",
    "fbh-firebase-util": "github:djindjic/fbh-firebase-util@0.0.22",
    "hammer": "github:hammerjs/hammer.js@2.0.4",
    "metabolicjs": "github:djindjic/metabolicjs@0.0.2",
    "text": "github:systemjs/plugin-text@0.0.2",
    "github:angular-ui/ui-router@0.2.13": {
      "angular": "github:angular/bower-angular@1.3.7"
    },
    "github:angular/bower-angular-animate@1.3.7": {
      "angular": "github:angular/bower-angular@1.3.7"
    },
    "github:angular/bower-angular-aria@1.3.7": {
      "angular": "github:angular/bower-angular@1.3.7"
    },
    "github:angular/bower-material@0.6.1": {
      "angular": "github:angular/bower-angular@1.3.7",
      "angular-animate": "github:angular/bower-angular-animate@1.3.7",
      "angular-aria": "github:angular/bower-angular-aria@1.3.7",
      "css": "github:systemjs/plugin-css@0.1.0",
      "hammer": "github:hammerjs/hammer.js@2.0.4"
    },
    "github:djindjic/fbh-firebase-util@0.0.22": {
      "angular": "github:angular/bower-angular@1.3.7",
      "angularfire": "github:firebase/angularfire@0.9.0"
    },
    "github:firebase/angularfire@0.9.0": {
      "angular": "github:angular/bower-angular@1.3.7",
      "firebase": "github:firebase/firebase-bower@2.0.6"
    }
  }
});

