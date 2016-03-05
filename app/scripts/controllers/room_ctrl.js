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

  console.log("hit")

  if ($scope.room.players) {
    $scope.count = $scope.room.players.length
  } else {
   $scope.count = 0
  }

  if ($scope.count === 7) {
    $scope.showform = false;
  }

  $scope.showForm = function() {
    $scope.showform = true;
  };

  $scope.cancel = function() {
    $scope.showform = false;
  };

  $scope.addPlayer = function(player) {
    console.log(player);
    var id = (parseInt($stateParams.id) + 1).toString()
    RoomsService.update(id, player)
    // $scope.count = $scope.room.players.length;
    $state.reload();
  };

  $scope.closeRoom = function(){
    var id = (parseInt($stateParams.id) + 1).toString()
    RoomsService.delete(id)
  }

}]);
