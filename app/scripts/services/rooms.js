'use strict'
angular.module('eventMeetApp')
.factory('RoomsService', function($http){

  var o = {};
  var getRooms = function() {
    return $http.get('http://localhost:3000/api/rooms')
  };

  o.getRooms = getRooms
  return o;
});