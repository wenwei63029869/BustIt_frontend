'use strict'
angular.module('eventMeetApp')
.controller('RoomsCtrl', ['$scope', 'rooms', function($scope, rooms) {
  var pathname = window.location.href;
  if (pathname === "http://localhost:9000/#/rooms") {
    $("#header").css("background-color", "#383b43");
  };

  $scope.jumpToAddRooms = function(){
    console.log("add rooms")
    // document.getElementById("one").scrollIntoView({block: "start", behavior:"auto"})
    $('html, body').animate({
        scrollTop: $("#form").offset().top
    }, 400);

  };

  $scope.rooms = rooms.rooms


  $scope.master = {};

  $scope.addRoom = function(room) {

    $scope.rooms.push({name: room.name, description: room.description});
    // $scope.master = angular.copy(room);
    $('html, body').animate({
        scrollTop: $("#rooms").offset().top
    }, 400);

  };

  $scope.reset = function() {
    // angular.copy($scope.user, $scope.master);
  };

  $scope.reset();

}]);
