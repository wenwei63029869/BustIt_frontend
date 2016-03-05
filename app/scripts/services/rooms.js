'use strict'
angular.module('eventMeetApp')
.factory('RoomsService', function($http, $location){

  var o = {};

  o.rooms = []

  o.getAll = function() {
    return $http.get('http://localhost:3000/api/rooms').success(function(data){
      angular.copy(data.rooms, o.rooms);
    });
  };

  o.get = function(id) {
    return $http.get('http://localhost:3000/api/rooms/'+id).then(function(res){
        return res.data;
      });
    };

  o.create = function(content) {
    return $http.post('http://localhost:3000/api/rooms', content).success(function(data){
        o.rooms.push(data.room);
      });
  };

  o.update = function(id, content) {
    return $http.put('http://localhost:3000/api/rooms/'+id, content).success(function(data){
      console.log(data)
    })
  }

  o.delete = function(id){
    return $http.delete('http://localhost:3000/api/rooms/'+id).success(function(){
      $location.path('/rooms').replace()
    })
  }

  return o;
});