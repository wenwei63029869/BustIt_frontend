"use strict"

angular.module('BustItFilter', [])
.filter('playerCountFilter', function() {
  return function(input) {
    var result = []
    for (var i = 0; i < input.length; i++) {
      if (input[i].role === 'player' || input[i].role === 'citizen' || input[i].role === 'spy') {
        result.push(input[i]);
      };
    };
    return result;
  };
});