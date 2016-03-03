'use strict'
angular.module('eventMeetApp')
.controller('AuthCtrl',[
  '$scope',
  'AuthService',
  function($scope, AuthService) {
    $scope.currentUser = AuthService.currentUser
    console.log($scope.currentUser)
}]);