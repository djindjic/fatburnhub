import angular from 'angular';

export let loginControllerModule = angular.module('loginControllerModule', [])
.controller('LoginController', ['$scope', function($scope) {
  var ref = new Firebase($scope.firebaseUrl);

  ref.onAuth(function(authData) {
	  if (authData) {
	  	ref.child('users').child(authData.uid).set(authData);
	    // user authenticated with Firebase
	    console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
	    $scope.uid = authData.uid;
	    $scope.authenticated = true;
	  } else {
	  	$scope.authenticated = false;
	  	//  window.cookies.clear(function() {
		  //   console.log("Cookies cleared!");
		  // });
	    console.log("user is logged out");
	  }
	});

  // Logs a user in with inputted provider
  $scope.login = function(provider) {
  	$scope.authenticated = true;
    ref.authWithOAuthPopup("facebook", function(error, authData) {
    	if (authData) {
		    // the access token will allow us to make Open Graph API calls
		    console.log(authData.facebook.accessToken);
		  }
    }, {
	  remember: "default",
	  scope: "email"
	});
  };
  $scope.logout = function(provider) {
    ref.unauth();
  };
}]);