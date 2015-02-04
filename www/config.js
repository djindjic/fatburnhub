System.config({
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "fatburnhub/*": "app/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.3.12",
    "angular-material": "github:angular/bower-material@0.7.1",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.13",
    "css": "github:systemjs/plugin-css@0.1.0",
    "fbh-firebase-util": "github:djindjic/fbh-firebase-util@0.1.10",
    "metabolicjs": "github:djindjic/metabolicjs@0.1.22",
    "text": "github:systemjs/plugin-text@0.0.2",
    "github:angular-ui/ui-router@0.2.13": {
      "angular": "github:angular/bower-angular@1.3.12"
    },
    "github:angular/bower-angular-animate@1.3.12": {
      "angular": "github:angular/bower-angular@1.3.12"
    },
    "github:angular/bower-angular-aria@1.3.12": {
      "angular": "github:angular/bower-angular@1.3.12"
    },
    "github:angular/bower-material@0.7.1": {
      "angular": "github:angular/bower-angular@1.3.12",
      "angular-animate": "github:angular/bower-angular-animate@1.3.12",
      "angular-aria": "github:angular/bower-angular-aria@1.3.12",
      "css": "github:systemjs/plugin-css@0.1.0"
    },
    "github:aurelia/dependency-injection@0.4.2": {
      "aurelia-metadata": "github:aurelia/metadata@0.3.1",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:djindjic/fbh-firebase-util@0.1.10": {
      "angular": "github:angular/bower-angular@1.3.12",
      "angularfire": "github:firebase/angularfire@0.9.2"
    },
    "github:djindjic/metabolicjs@0.1.22": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.4.2",
      "decimal.js": "github:MikeMcl/decimal.js@4.0.1",
      "forwardablejs": "npm:forwardablejs@0.1.56"
    },
    "github:firebase/angularfire@0.9.2": {
      "angular": "github:angular/bower-angular@1.3.12",
      "firebase": "github:firebase/firebase-bower@2.1.2"
    },
    "github:jspm/nodelibs-process@0.1.0": {
      "process": "npm:process@0.10.0"
    },
    "npm:core-js@0.4.10": {
      "process": "github:jspm/nodelibs-process@0.1.0"
    }
  }
});

