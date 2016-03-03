angular.module('eventMeetApp')
.factory( 'AuthService', function() {
  var currentUser;
  // we can just create a auth route in backend and return a json object of current user.
  return {
    // login: function() { ... },
    // logout: function() { ... },
    // isLoggedIn: function() { ... },
    // currentUser: function() { return currentUser; }
    // ...
    currentUser: {name: 'player3'}
  };
});