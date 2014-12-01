System.config({
  "paths": {
    "*": "*.js",
    "github:*": "https://github.jspm.io/*.js"
  }
});

System.config({
  "depCache": {
    "github:systemjs/plugin-css@0.1.0/css": [],
    "github:driftyco/ionic-bower@1.0.0-beta.13/js/ionic": [],
    "github:angular/bower-angular@1.3.4/angular.min": [],
    "github:angular/bower-angular-animate@1.3.4/angular-animate": [
      "github:angular/bower-angular@1.3.4"
    ],
    "github:angular/bower-angular-sanitize@1.3.4/angular-sanitize": [
      "github:angular/bower-angular@1.3.4"
    ],
    "github:angular-ui/ui-router@0.2.10/release/angular-ui-router": [],
    "github:firebase/firebase-bower@2.0.5/firebase": [],
    "app/routes/diet/diet.template.html!github:systemjs/plugin-text@0.0.2": [],
    "app/routes/training/training.template.html!github:systemjs/plugin-text@0.0.2": [],
    "github:systemjs/plugin-css@0.1.0": [
      "github:systemjs/plugin-css@0.1.0/css"
    ],
    "github:angular/bower-angular@1.3.4": [
      "github:angular/bower-angular@1.3.4/angular.min"
    ],
    "github:angular/bower-angular-animate@1.3.4": [
      "github:angular/bower-angular-animate@1.3.4/angular-animate"
    ],
    "github:angular/bower-angular-sanitize@1.3.4": [
      "github:angular/bower-angular-sanitize@1.3.4/angular-sanitize"
    ],
    "github:angular-ui/ui-router@0.2.10": [
      "github:angular-ui/ui-router@0.2.10/release/angular-ui-router"
    ],
    "github:firebase/firebase-bower@2.0.5": [
      "github:firebase/firebase-bower@2.0.5/firebase"
    ],
    "app/routes/diet/diet.route": [
      "app/routes/diet/diet.template.html!github:systemjs/plugin-text@0.0.2"
    ],
    "app/routes/training/training.route": [
      "app/routes/training/training.template.html!github:systemjs/plugin-text@0.0.2"
    ],
    "github:driftyco/ionic-bower@1.0.0-beta.13/css/ionic.css!github:systemjs/plugin-css@0.1.0": [
      "github:systemjs/plugin-css@0.1.0"
    ],
    "github:firebase/angularfire@0.9.0/angularfire": [
      "github:firebase/firebase-bower@2.0.5",
      "github:angular/bower-angular@1.3.4"
    ],
    "github:driftyco/ionic-bower@1.0.0-beta.13/js/ionic-angular": [
      "github:driftyco/ionic-bower@1.0.0-beta.13/css/ionic.css!github:systemjs/plugin-css@0.1.0",
      "github:driftyco/ionic-bower@1.0.0-beta.13/js/ionic",
      "github:angular/bower-angular@1.3.4",
      "github:angular/bower-angular-animate@1.3.4",
      "github:angular/bower-angular-sanitize@1.3.4",
      "github:angular-ui/ui-router@0.2.10"
    ],
    "github:firebase/angularfire@0.9.0": [
      "github:firebase/angularfire@0.9.0/angularfire"
    ],
    "github:driftyco/ionic-bower@1.0.0-beta.13": [
      "github:driftyco/ionic-bower@1.0.0-beta.13/js/ionic-angular"
    ],
    "app/main": [
      "github:driftyco/ionic-bower@1.0.0-beta.13",
      "github:firebase/angularfire@0.9.0",
      "app/routes/diet/diet.route",
      "app/routes/training/training.route"
    ]
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

