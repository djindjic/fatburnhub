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
    "angular": "github:angular/bower-angular@1.3.13",
    "angular-material": "github:angular/bower-material@0.7.1",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.13",
    "css": "github:systemjs/plugin-css@0.1.1",
    "fbh-firebase-util": "npm:fbh-firebase-util@0.1.12",
    "metabolicjs": "npm:metabolicjs@0.1.28",
    "text": "github:systemjs/plugin-text@0.0.2",
    "github:angular-ui/ui-router@0.2.13": {
      "angular": "github:angular/bower-angular@1.3.13"
    },
    "github:angular/bower-angular-animate@1.3.13": {
      "angular": "github:angular/bower-angular@1.3.13"
    },
    "github:angular/bower-angular-aria@1.3.13": {
      "angular": "github:angular/bower-angular@1.3.13"
    },
    "github:angular/bower-material@0.7.1": {
      "angular": "github:angular/bower-angular@1.3.13",
      "angular-animate": "github:angular/bower-angular-animate@1.3.13",
      "angular-aria": "github:angular/bower-angular-aria@1.3.13",
      "css": "github:systemjs/plugin-css@0.1.1"
    },
    "github:aurelia/dependency-injection@0.4.2": {
      "aurelia-metadata": "github:aurelia/metadata@0.3.1",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:firebase/angularfire@0.9.2": {
      "angular": "github:angular/bower-angular@1.3.13",
      "firebase": "github:firebase/firebase-bower@2.1.2"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.0"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:systemjs/plugin-css@0.1.1": {
      "csso": "npm:csso@1.3.11",
      "fs": "github:jspm/nodelibs-fs@0.1.1"
    },
    "npm:core-js@0.4.10": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:csso@1.3.11": {
      "fs": "github:jspm/nodelibs-fs@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:fbh-firebase-util@0.1.10": {
      "angular": "github:angular/bower-angular@1.3.13",
      "angularfire": "github:firebase/angularfire@0.9.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:fbh-firebase-util@0.1.12": {
      "angular": "github:angular/bower-angular@1.3.13",
      "angularfire": "github:firebase/angularfire@0.9.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:metabolicjs@0.1.28": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.4.2",
      "decimal.js": "github:MikeMcl/decimal.js@4.0.1",
      "forwardablejs": "npm:forwardablejs@0.1.61",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

