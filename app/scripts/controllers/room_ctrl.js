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
  $scope.count = 0;
  $scope.currentUser = AuthService.currentUser;
  $scope.showJoinGameForm = false;
  $scope.showWriteKeywordForm = false;

  if (pathname.includes("http://localhost:9000/#/rooms/")) {
    $("#header").css("background-color", "#383b43");
  };

  $scope.hasJudge = false;

  for (var i = 0; i < room.players.length; i++) {
    if ((room.players)[i].role === 'judge') {
      $scope.hasJudge = true;
      $scope.judge = (room.players)[i];
    }
  }

  $scope.count = $scope.room.players ? $scope.room.players.length : $scope.count = 0

  if ($scope.count === 8) {
    $scope.showJoinGameForm = false;
  }

  $scope.inGame = function() {
    $scope.currentUser.role === nil
  }

  $scope.showGameForm = function() {
    $scope.showJoinGameForm = true;
  };

  $scope.cancel = function() {
    $scope.showJoinGameForm = false;
  };

  $scope.addPlayer = function(player) {
    RoomsService.update($stateParams.id, player)
    .success(function(data){
      console.log(data.room)
      $scope.room = data.room
    })
    // $state.reload();
  };

  $scope.exitGame = function() {
    var content = {"exit" : "true"}
    RoomsService.update($stateParams.id, content)
    .success(function(data){
      console.log(data)
      $scope.room = data
    })
    // $state.reload();
  }

  $scope.closeRoom = function() {
    RoomsService.delete($stateParams.id)
  }

  console.log("room status:" + room.status)
  if (room.status === 'in progress') {
    $scope.gameStarted = true;
  }

  $scope.startGame = function() {
    console.log($stateParams.id)
    RoomsService.startGame($stateParams.id)
    .success(function(data){
      $scope.message = "Now please check with the players and see if they receive their keywords through SMS message yet.";
      console.log(data)
      $scope.room = data
    }).error(function(error){
      $scope.message = "Sorry, there is a problem sending the keyword to some of the players. Please make sure they enter a right phone number";
    });
  }

  $scope.voteOut = function(player_id) {
    console.log(player_id);
    var content = {'player_id': player_id};
    RoomsService.voteOut($stateParams.id, content).success(function(msg){
      console.log(msg);
      $scope.message = msg.message
      $scope.gameStarted = false;
      // how to make the start game button appear again without refreshing the page?
    });
  }

  $scope.showKeywordForm = function(){
    $scope.showWriteKeywordForm = true;
  }

}]);
