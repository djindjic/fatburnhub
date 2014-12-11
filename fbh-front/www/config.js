System.config({
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js"
  },
  "bundles": {
    "build-19": [
      "github:angular/bower-angular@1.3.6/angular.min",
      "github:systemjs/plugin-css@0.1.0/css",
      "github:driftyco/ionic-bower@1.0.0-beta.13/js/ionic",
      "github:angular/bower-angular-animate@1.3.6/angular-animate",
      "github:angular/bower-angular-sanitize@1.3.6/angular-sanitize",
      "github:angular-ui/ui-router@0.2.10/release/angular-ui-router",
      "github:firebase/firebase-bower@2.0.6/firebase",
      "github:djindjic/fbh-firebase-util@0.0.18/lib/fbhFirebaseAuthentication/fbhFirebaseAuthentication.controller",
      "github:djindjic/fbh-firebase-util@0.0.18/lib/fbhFirebaseAuthentication/fbhFirebaseAuthentication.directive",
      "github:djindjic/fbh-firebase-util@0.0.18/lib/fbhFirebaseAuthentication/fbhFirebaseLogin/fbhFirebaseLogin.directive",
      "github:djindjic/fbh-firebase-util@0.0.18/lib/fbhFirebaseAuthentication/fbhFirebaseLogout/fbhFirebaseLogout.directive",
      "github:djindjic/fbh-firebase-util@0.0.18/lib/fbhFirebaseRef/fbhFirebaseRef.provider",
      "app/constants/main.constant",
      "app/config/main.config",
      "app/config/fbhFirebaseUtil.config",
      "app/routes/diet/diet.template.html!github:systemjs/plugin-text@0.0.2",
      "app/routes/diet/diet.controller",
      "app/routes/training/training.template.html!github:systemjs/plugin-text@0.0.2",
      "app/routes/training/training.controller",
      "github:angular/bower-angular@1.3.6",
      "github:systemjs/plugin-css@0.1.0",
      "github:angular/bower-angular-animate@1.3.6",
      "github:angular/bower-angular-sanitize@1.3.6",
      "github:angular-ui/ui-router@0.2.10",
      "github:firebase/firebase-bower@2.0.6",
      "github:djindjic/fbh-firebase-util@0.0.18/lib/fbhFirebaseAuthentication/fbhFirebaseAuthentication.module",
      "app/routes/diet/diet.route",
      "app/routes/training/training.route",
      "github:firebase/angularfire@0.9.0/angularfire",
      "github:djindjic/fbh-firebase-util@0.0.18/lib/fbhFirebaseUtil",
      "github:driftyco/ionic-bower@1.0.0-beta.13/js/ionic-angular",
      "github:firebase/angularfire@0.9.0",
      "github:djindjic/fbh-firebase-util@0.0.18",
      "github:driftyco/ionic-bower@1.0.0-beta.13",
      "app/main",
      "app/bootstrap"
    ]
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.3.6",
    "angularfire": "github:firebase/angularfire@0.9.0",
    "css": "github:systemjs/plugin-css@0.1.0",
    "fbh-firebase-util": "github:djindjic/fbh-firebase-util@0.0.18",
    "ionic": "github:driftyco/ionic-bower@1.0.0-beta.13",
    "text": "github:systemjs/plugin-text@0.0.2",
    "github:angular/bower-angular-animate@1.3.6": {
      "angular": "github:angular/bower-angular@1.3.6"
    },
    "github:angular/bower-angular-sanitize@1.3.6": {
      "angular": "github:angular/bower-angular@1.3.6"
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

