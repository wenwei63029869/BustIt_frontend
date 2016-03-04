'use strict'
angular.module('eventMeetApp')
.controller('RoomCtrl', [
  '$scope',
  '$stateParams',
  'RoomsService',
  'AuthService',
  'room',
  function($scope, RoomsService, AuthService, $stateParams, room) {

  var pathname = window.location.href;
  $scope.room = room;
  console.log('room: ' + room)
  $scope.count = 0
  $scope.currentUser = AuthService.currentUser;
  $scope.showform = false;

  if (pathname.includes("http://localhost:9000/#/rooms/")) {
    $("#header").css("background-color", "#383b43");
  };

  if ($scope.room.players) {
    $scope.count = $scope.room.players.length
  } else {
   $scope.count = 0
  }

  $scope.showForm = function() {
    $scope.showform = true;
  };

  $scope.cancel = function() {
    $scope.showform = false;
  };

  $scope.addPlayer = function(player) {
    $scope.room.players.push({name: player.name, phoneNumber: player.phoneNumber, keyword: ''});
    $scope.count = $scope.room.players.length;
    if ($scope.count === 7) {
      $scope.showform = false;
    }
  };

}]);
