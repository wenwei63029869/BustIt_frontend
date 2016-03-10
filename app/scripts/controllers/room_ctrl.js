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
  $scope.currentUser = AuthService.currentUser;
  $scope.showJoinGameForm = false;
  $scope.showWriteKeywordForm = false;
  $scope.hasJudge = false;

  if (pathname.includes("http://localhost:9000/#/rooms/")) {
    $("#header").css("background-color", "#383b43");
  };

  $scope.gameStarted = room.status === 'in progress' ? true : false;

  var findJudge = function() {
    for (var i = 0; i < $scope.room.players.length; i++) {
      if (($scope.room.players)[i].role === 'judge') {
        var hasJudge = true;
        $scope.judge = ($scope.room.players)[i];
      };
    };
    if (hasJudge) {
      console.log("has judge")
      $scope.hasJudge = true;
    } else {
      console.log("has no judge")
      $scope.hasJudge = false;
    }
  };

  findJudge();

  var countPlayer = function() {
    $scope.count = 0;
    if (!$scope.gameStarted) {
      for (var i = 0; i < $scope.room.players.length; i++) {
        if (($scope.room.players)[i].role === 'player') {
          console.log("count ", $scope.count)
          $scope.count++
        };
      };
      // console.log("count ", $scope.count)
    } else{
      for (var i = 0; i < $scope.room.players.length; i++) {
        if (($scope.room.players)[i].role === 'spy' || ($scope.room.players)[i].role === 'citizen') {
          console.log("count ", $scope.count)
          $scope.count++
        };
      };
    };
    return $scope.count
  };

  countPlayer();


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
    if (countPlayer() === 7 && player.role !== "judge") {
      console.log("equal to 6")
      $scope.joinGameMessage = "Sorry, the room is full. You can join the game as audience to watch the game!"
    } else if (player.role === "judge" && $scope.hasJudge) {
      $scope.joinGameMessage = "Sorry, judge is taken."
    } else {
      console.log("not equal to 6")
      RoomsService.update($stateParams.id, player)
      .success(function(data){
        console.log(data.room)
        $scope.room = data.room
        $scope.showJoinGameForm = !$scope.showJoinGameForm;
        findJudge();
        $scope.joinGameMessage = "";
      })
    };
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
