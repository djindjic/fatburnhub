System.config({
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "jspm_sample_project/*": "app/*.js",
    "fatburnhub/*": "app/*.js"
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.3.9",
    "angular-material": "github:angular/bower-material@0.6.1",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.13",
    "css": "github:systemjs/plugin-css@0.1.0",
    "fbh-firebase-util": "github:djindjic/fbh-firebase-util@0.0.22",
    "hammer": "github:hammerjs/hammer.js@2.0.4",
    "metabolicjs": "github:djindjic/metabolicjs@0.1.11",
    "text": "github:systemjs/plugin-text@0.0.2",
    "github:angular-ui/ui-router@0.2.13": {
      "angular": "github:angular/bower-angular@1.3.9"
    },
    "github:angular/bower-angular-animate@1.3.9": {
      "angular": "github:angular/bower-angular@1.3.9"
    },
    "github:angular/bower-angular-aria@1.3.9": {
      "angular": "github:angular/bower-angular@1.3.9"
    },
    "github:angular/bower-material@0.6.1": {
      "angular": "github:angular/bower-angular@1.3.9",
      "angular-animate": "github:angular/bower-angular-animate@1.3.9",
      "angular-aria": "github:angular/bower-angular-aria@1.3.9",
      "css": "github:systemjs/plugin-css@0.1.0",
      "hammer": "github:hammerjs/hammer.js@2.0.4"
    },
    "github:aurelia/dependency-injection@0.1.1": {
      "aurelia-metadata": "github:aurelia/metadata@0.1.1",
      "es6-shim": "github:paulmillr/es6-shim@0.21.1"
    },
    "github:djindjic/fbh-firebase-util@0.0.22": {
      "angular": "github:angular/bower-angular@1.3.9",
      "angularfire": "github:firebase/angularfire@0.9.1"
    },
    "github:djindjic/metabolicjs@0.1.11": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.1.1",
      "decimal.js": "github:MikeMcl/decimal.js@4.0.1",
      "forwardablejs": "github:djindjic/forwardablejs@0.1.44"
    },
    "github:firebase/angularfire@0.9.1": {
      "angular": "github:angular/bower-angular@1.3.9",
      "firebase": "github:firebase/firebase-bower@2.1.1"
    }
  }
});
