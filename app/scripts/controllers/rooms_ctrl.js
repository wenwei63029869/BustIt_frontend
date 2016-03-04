'use strict'
angular.module('eventMeetApp')
.controller('RoomsCtrl', ['$scope', "RoomsService", function($scope, RoomsService) {
  var pathname = window.location.href;
  if (pathname === "http://localhost:9000/#/rooms") {
    $("#header").css("background-color", "#383b43");
  };

  $scope.jumpToAddRooms = function(){
    console.log("add rooms")
    $('html, body').animate({
        scrollTop: $("#form").offset().top
    }, 400);

  };

  $scope.rooms = RoomsService.rooms

  console.log($scope.rooms)

  $scope.master = {};

  $scope.createRoom = function(room) {

    RoomsService.create({
      name: room.name,
      description: room.description
    });
    $scope.name = '';
    $scope.description = '';

  };

  $scope.reset = function() {
    // angular.copy($scope.user, $scope.master);
  };

  $scope.reset();

}]);
