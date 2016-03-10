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

  var findJudge = function() {
    for (var i = 0; i < room.players.length; i++) {
      if ((room.players)[i].role === 'judge') {
        $scope.hasJudge = !$scope.hasJudge;
        $scope.judge = (room.players)[i];
      };
    };
  };

  findJudge();

  $scope.count = $scope.room.players ? $scope.room.players.length : $scope.count = 0

  // if ($scope.count === 8) {
  //   $scope.showJoinGameForm = !$scope.showJoinGameForm;
  // }

  $scope.inGame = function() {
    $scope.currentUser.role === nil
  }

  $scope.showGameForm = function() {
    $scope.showJoinGameForm = !$scope.showJoinGameForm;
  };

  $scope.cancel = function() {
    $scope.showJoinGameForm = !$scope.showJoinGameForm;
  };

  $scope.addPlayer = function(player) {
    RoomsService.update($stateParams.id, player)
    .success(function(data){
      console.log(data.room)
      $scope.room = data.room
      $scope.showJoinGameForm = !$scope.showJoinGameForm;
      findJudge();
    })
  };

  $scope.exitGame = function() {
    var content = {"exit" : "true"}
    RoomsService.update($stateParams.id, content)
    .success(function(data){
      console.log(data)
      $scope.room = data
    })
  }

  $scope.closeRoom = function() {
    RoomsService.delete($stateParams.id)
  }

  $scope.startGame = function() {
    console.log($stateParams.id)
    RoomsService.startGame($stateParams.id, {})
    .success(function(data){
      $scope.message = "Now please check with the players and see if they receive their keywords through SMS message yet.";
      $scope.room = data;
      $scope.gameStarted = true;
    }).error(function(error){
      $scope.message = "Sorry, there is a problem sending the keyword to some of the players. Please make sure they enter a right phone number";
    });
  }

  $scope.showKeywordFormButton = false;
  $scope.showWriteKeywordForm = false;

  $scope.showKeywordForm = function(){
    $scope.showWriteKeywordForm = !$scope.showWriteKeywordForm;
    $scope.showKeywordFormButton = !$scope.showKeywordFormButton;
  }

  $scope.addKeywordPair = function(keyword) {
    console.log(keyword)
    RoomsService.startGame($stateParams.id, {keyword_pair: keyword})
    .success(function(data){
      $scope.message = "Now please tell the players to refresh the page to see their keywords.";
      $scope.room = data;
      $scope.gameStarted = true;
      $scope.showWriteKeywordForm = !$scope.showWriteKeywordForm;
    }).error(function(error){
      $scope.message = "Sorry, there is a problem sending the keyword to some of the players. Please make sure they enter a right phone number";
    });
  }

  $scope.voteOut = function(player_id) {
    console.log(player_id);
    var content = {'player_id': player_id};
    RoomsService.voteOut($stateParams.id, content).success(function(msg){
      console.log("msg:", msg);
      $scope.message = msg.message
      console.log("room:", msg.room)
      $scope.room = msg.room;
      $scope.gameStarted = false;
    });
  }

}]);
