System.config({
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js"
  },
  "bundles": {
    "bundle-25": [
      "github:angular/bower-angular@1.3.7/angular.min",
      "github:systemjs/plugin-css@0.1.0/css",
      "github:hammerjs/hammer.js@2.0.4/hammer",
      "github:angular/bower-angular-animate@1.3.7/angular-animate",
      "github:angular/bower-angular-aria@1.3.7/angular-aria",
      "github:angular-ui/ui-router@0.2.13/angular-ui-router",
      "github:firebase/firebase-bower@2.0.6/firebase",
      "github:djindjic/fbh-firebase-util@0.0.22/lib/fbhFirebaseAuthentication/fbhFirebaseAuthentication.controller",
      "github:djindjic/fbh-firebase-util@0.0.22/lib/fbhFirebaseAuthentication/fbhFirebaseAuthentication.directive",
      "github:djindjic/fbh-firebase-util@0.0.22/lib/fbhFirebaseAuthentication/fbhFirebaseLogin/fbhFirebaseLogin.directive",
      "github:djindjic/fbh-firebase-util@0.0.22/lib/fbhFirebaseAuthentication/fbhFirebaseLogout/fbhFirebaseLogout.directive",
      "github:djindjic/fbh-firebase-util@0.0.22/lib/fbhFirebaseRef/fbhFirebaseRef.provider",
      "app/constants/main.constant",
      "app/config/main.config",
      "app/config/fbhFirebaseUtil.config",
      "app/routes/diet/diet.template.html!github:systemjs/plugin-text@0.0.2",
      "github:djindjic/metabolicjs@0.0.2/lib/src/Person",
      "app/routes/training/training.template.html!github:systemjs/plugin-text@0.0.2",
      "app/routes/training/training.controller",
      "github:angular/bower-angular@1.3.7",
      "github:systemjs/plugin-css@0.1.0",
      "github:hammerjs/hammer.js@2.0.4",
      "github:angular/bower-angular-animate@1.3.7",
      "github:angular/bower-angular-aria@1.3.7",
      "github:angular-ui/ui-router@0.2.13",
      "github:firebase/firebase-bower@2.0.6",
      "github:djindjic/fbh-firebase-util@0.0.22/lib/fbhFirebaseAuthentication/fbhFirebaseAuthentication.module",
      "github:djindjic/metabolicjs@0.0.2/lib/metabolic",
      "app/routes/training/training.route",
      "github:firebase/angularfire@0.9.0/angularfire",
      "github:djindjic/metabolicjs@0.0.2",
      "github:angular/bower-material@0.6.1/angular-material",
      "github:firebase/angularfire@0.9.0",
      "app/routes/diet/diet.controller",
      "github:angular/bower-material@0.6.1",
      "github:djindjic/fbh-firebase-util@0.0.22/lib/fbhFirebaseUtil",
      "app/routes/diet/diet.route",
      "github:djindjic/fbh-firebase-util@0.0.22",
      "app/main",
      "app/bootstrap"
    ]
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

