'use strict'
angular.module('eventMeetApp')
.controller('HeaderCtrl',[
  // why the order of dependency matters???????
  '$scope',
  '$auth',
  'AuthService',
  '$location',
  function($scope, $auth, AuthService, $location) {
    $scope.currentUser = AuthService.currentUser
    console.log($scope.currentUser);
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    $scope.authenticate = function(provider) {
      AuthService.authenticate(provider);
      $scope.currentUser = AuthService.currentUser
      console.log("currentUser:" + $scope.currentUser);
    };
    $scope.logout = function(){
      console.log("logout")
      $auth.logout();
      $location.path('/').replace();
    }
 }]);