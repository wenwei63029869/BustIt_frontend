'use strict'
angular.module('eventMeetApp')
.factory('RoomsService', function($http){

  var o = {};

  o.rooms = []

  o.getAll = function() {
    return $http.get('http://localhost:3000/api/rooms').success(function(data){
      angular.copy(data.rooms, o.rooms);
    });
  };

  o.create = function(content) {
    return $http.post('http://localhost:3000/api/rooms', content).success(function(data){
      o.rooms.push(data.room);
    });
  };

  return o;
});