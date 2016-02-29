'use strict'
angular.module('eventMeetApp')
.controller('RoomsCtrl', function($scope) {
  var pathname = window.location.href;
  if (pathname === "http://localhost:9000/#/rooms") {
    $("#header").css("background-color", "#383b43")
  }
});
