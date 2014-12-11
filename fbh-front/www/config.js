System.config({
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js"
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.3.6",
    "angular-material": "github:angular/bower-material@0.6.1",
    "angularfire": "github:firebase/angularfire@0.9.0",
    "css": "github:systemjs/plugin-css@0.1.0",
    "fbh-firebase-util": "github:djindjic/fbh-firebase-util@0.0.18",
    "hammer": "github:hammerjs/hammer.js@2.0.4",
    "ionic": "github:driftyco/ionic-bower@1.0.0-beta.13",
    "text": "github:systemjs/plugin-text@0.0.2",
    "github:angular/bower-angular-animate@1.3.6": {
      "angular": "github:angular/bower-angular@1.3.6"
    },
    "github:angular/bower-angular-aria@1.3.6": {
      "angular": "github:angular/bower-angular@1.3.6"
    },
    "github:angular/bower-angular-sanitize@1.3.6": {
      "angular": "github:angular/bower-angular@1.3.6"
    },
    "github:angular/bower-material@0.6.1": {
      "angular": "github:angular/bower-angular@1.3.6",
      "angular-animate": "github:angular/bower-angular-animate@1.3.6",
      "angular-aria": "github:angular/bower-angular-aria@1.3.6",
      "css": "github:systemjs/plugin-css@0.1.0",
      "hammer": "github:hammerjs/hammer.js@2.0.4"
    },
    "github:djindjic/fbh-firebase-util@0.0.18": {
      "angular": "github:angular/bower-angular@1.3.6",
      "angularfire": "github:firebase/angularfire@0.9.0"
    },
    "github:driftyco/ionic-bower@1.0.0-beta.13": {
      "angular": "github:angular/bower-angular@1.3.6",
      "angular-animate": "github:angular/bower-angular-animate@1.3.6",
      "angular-sanitize": "github:angular/bower-angular-sanitize@1.3.6",
      "angular-ui-router": "github:angular-ui/ui-router@0.2.10",
      "css": "github:systemjs/plugin-css@0.1.0"
    },
    "github:firebase/angularfire@0.9.0": {
      "angular": "github:angular/bower-angular@1.3.6",
      "firebase": "github:firebase/firebase-bower@2.0.6"
    }
  }
});

