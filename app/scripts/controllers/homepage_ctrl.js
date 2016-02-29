'use strict'
angular.module('eventMeetApp')
.controller('HomepageCtrl', function($scope) {
  $scope.name = "Wei";
  console.log(document.getElementById("one"))
  $scope.jumpToTheRules = function(){
    // document.getElementById("one").scrollIntoView({block: "start", behavior:"auto"})
    $('html, body').animate({
        scrollTop: $("#one").offset().top
    }, 400);
  }
  $scope.jumpToTheRooms = function(){
    // document.getElementById("one").scrollIntoView({block: "start", behavior:"auto"})
    $('html, body').animate({
        scrollTop: $("#two").offset().top
    }, 400);
  }
});
