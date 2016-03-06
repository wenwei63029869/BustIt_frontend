'use strict'
angular.module('eventMeetApp')
.controller('RoomsCtrl', [
  '$scope',
  'RoomsService',
  'NgTableParams',
  '$state',
  function($scope, RoomsService, NgTableParams, $state) {
  var pathname = window.location.href;
  if (pathname === "http://localhost:9000/#/rooms") {
    $("#header").css("background-color", "#383b43");
  };

  $scope.jumpToAddRooms = function(){
    $('html, body').animate({
        scrollTop: $("#form").offset().top
    }, 400);
  };

  $scope.rooms = RoomsService.rooms

  $scope.tableParams = new NgTableParams({
      page: 1, // show first page
      count: 10 // count per page
    }, {
      filterDelay: 0,
      data: $scope.rooms
    });

  console.log($scope.rooms)

  $scope.master = {};

  $scope.createRoom = function(room) {
    console.log("create room")
    RoomsService.create({
      name: room.name,
      description: room.description
    });

    room.name = '';
    room.description = '';

    $('html, body').animate({
        scrollTop: $(".rooms-list").offset().top
    }, 400);

    $scope.tableParams = new NgTableParams({
      page: 1, // show first page
      count: 20 // count per page
    }, {
      filterDelay: 0,
      data: $scope.rooms
    });
    $state.reload();
  };

  $scope.reset = function() {
    angular.copy($scope.master, $scope.room);
  };

  $scope.reset();

  $scope.join

}]);
