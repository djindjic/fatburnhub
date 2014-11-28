System.config({
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js"
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.3.4",
    "angularfire": "github:firebase/angularfire@0.9.0",
    "css": "github:systemjs/plugin-css@0.1.0",
    "ionic": "github:driftyco/ionic-bower@1.0.0-beta.13",
    "text": "github:systemjs/plugin-text@0.0.2",
    "github:angular/bower-angular-animate@1.3.4": {
      "angular": "github:angular/bower-angular@1.3.4"
    },
    "github:angular/bower-angular-sanitize@1.3.4": {
      "angular": "github:angular/bower-angular@1.3.4"
    },
    "github:driftyco/ionic-bower@1.0.0-beta.13": {
      "angular": "github:angular/bower-angular@1.3.4",
      "angular-animate": "github:angular/bower-angular-animate@1.3.4",
      "angular-sanitize": "github:angular/bower-angular-sanitize@1.3.4",
      "angular-ui-router": "github:angular-ui/ui-router@0.2.10",
      "css": "github:systemjs/plugin-css@0.1.0"
    },
    "github:firebase/angularfire@0.9.0": {
      "angular": "github:angular/bower-angular@1.3.4",
      "firebase": "github:firebase/firebase-bower@2.0.5"
    }
  }
});

