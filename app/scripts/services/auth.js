angular.module('eventMeetApp')
.factory( 'AuthService', function($http) {
  // we can just create a auth route in backend and return a json object of current user.
  var getProfile = function(){
      return $http.get('http://localhost:3000/api/me')
    };
  return {
    getProfile: getProfile
  };
});