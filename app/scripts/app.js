'use strict';

/**
 * @ngdoc overview
 * @name eventMeetApp
 * @description
 * # eventMeetApp
 *
 * Main module of the application.
 */

angular
 .module('eventMeetApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ui.router',
  'ngSanitize',
  'ngTouch'
])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('homepage', {
    url: '/',
    templateUrl: 'views/_homepage.html',
    controller: 'HomepageCtrl'
  })
  .state('roompage', {
    url: '/rooms',
    templateUrl: 'views/_rooms.html',
    controller: 'RoomsCtrl',
    resolve: {

    }
  });
})

/**
 * rooms table js
 */
$(document).ready(function () {
  $(".room-button").click(function(){
    console.log("hit room button");
    $("#header").css("background-color", "#383b43");
  })

  $(".home-button").click(function(){
    console.log("hit home button");
    $("#header").css("background-color", "transparent");
  })
});