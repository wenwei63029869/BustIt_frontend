'use strict'
angular.module('eventMeetApp')
.controller('RoomCtrl', [
  '$scope',
  '$stateParams',
  'RoomsService',
  'AuthService',
  'room',
  '$state',
  function($scope, $stateParams, RoomsService, AuthService, room, $state) {

  var pathname = window.location.href;
  $scope.room = room;
  $scope.count = 0
  $scope.currentUser = AuthService.currentUser;
  $scope.showform = false;
  $scope.currentUser = AuthService.currentUser

  if (pathname.includes("http://localhost:9000/#/rooms/")) {
    $("#header").css("background-color", "#383b43");
  };

  $scope.hasJudge = false;

  var players = room.players


  // temporary way to check if the current user is joining the game and what role he is playing
  for (var i = 0; i < players.length; i++) {
    console.log(players[i].email === $scope.currentUser.email)
    if (players[i].email === $scope.currentUser.email) {
      $scope.currentUser = players[i];
    };
  };

  for (var i = 0; i < players.length; i++) {
    if (players[i].role === 'judge') {
      $scope.hasJudge == true;
      $scope.judge = players[i];
    }
  }

  console.log("hit")

  if ($scope.room.players) {
    $scope.count = $scope.room.players.length
  } else {
   $scope.count = 0
  }

  if ($scope.count === 8) {
    $scope.showform = false;
  }

  $scope.showForm = function() {
    $scope.showform = true;
  };

  $scope.cancel = function() {
    $scope.showform = false;
  };

  $scope.addPlayer = function(player) {
    RoomsService.update($stateParams.id, player)
    $state.reload();
  };

  $scope.closeRoom = function(){
    RoomsService.delete($stateParams.id)
  }

}]);
