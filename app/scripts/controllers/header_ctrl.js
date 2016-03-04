'use strict'
angular.module('eventMeetApp')
.controller('HeaderCtrl',[
  // why the order of dependency matters???????
  '$scope',
  '$auth',
  'AuthService',
  function($scope, $auth, AuthService) {
    $scope.currentUser = ""
    AuthService.getProfile()
    .success(function(data){
        console.log(data);
        $scope.currentUser = data;
      });
    console.log($scope.currentUser);
    // console.log($scope.currentUser)
    $scope.authenticate = function(provider) {
        console.log('auth');
        console.log(window.location.origin);
        $auth.authenticate(provider)
        .then(function() {
          AuthService.getProfile()
            .success(function(data) {
              $scope.currentUser = data;
              console.log($scope.currentUser)
            });
        });
      };
 }]);