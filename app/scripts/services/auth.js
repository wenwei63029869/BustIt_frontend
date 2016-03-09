angular.module('eventMeetApp')
.factory( 'AuthService', function($http, $auth) {
  // we can just create a auth route in backend and return a json object of current user.
  o = {currentUser: []}

  o.getProfile = function() {
    console.log('hit get profile')
    return $http.get('http://localhost:3000/api/me')
      .success(function(msg){
        console.log("data: " + msg)
        console.log(msg)
        angular.copy(msg, o.currentUser);
        console.log("o.currentUser:", o.currentUser)
      });
  };

  o.authenticate = function(provider) {
    $auth.authenticate(provider)
    .then(function() {
      o.getProfile()
    });
  };
  return o
});