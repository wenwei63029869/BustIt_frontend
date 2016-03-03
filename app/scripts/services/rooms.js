'use strict'
angular.module('eventMeetApp')
.factory('rooms', function(){

  var o = {
    rooms: [
      {name: 'room 1', description: ';ag;wgnawogna;ownaw;oiwwa1', host: {name: 'player1'}, players: [
        {name: 'player2', number: '6268738817', status: 'playing', keyword: 'apple'},
        {name: 'player3', number: '6268738817', status: 'playing', keyword: 'apple'},
        {name: 'player4', number: '6268738817', status: 'playing', keyword: 'apple'},
        {name: 'player5', number: '6268738817', status: 'playing', keyword: 'apple'},
        {name: 'player6', number: '6268738817', status: 'playing', keyword: 'apple'},
        {name: 'player7', number: '6268738817', status: 'playing', keyword: 'apple'},
        {name: 'player8', number: '6268738817', status: 'playing', keyword: 'apple'}
      ]},
      {name: 'room 4', description: ';ag;wgnawogna;ownaw;oiwwa2', host: {name: 'player1'}, players: [
        {name: 'player8', number: '6268738817', status: 'playing', keyword: 'apple'},
        {name: 'player8', number: '6268738817', status: 'playing', keyword: 'apple'},
        {name: 'player8', number: '6268738817', status: 'playing', keyword: 'apple'},
        {name: 'player8', number: '6268738817', status: 'playing', keyword: 'apple'},
        {name: 'player8', number: '6268738817', status: 'playing', keyword: 'apple'},
        {name: 'player8', number: '6268738817', status: 'playing', keyword: 'apple'}
      ]},
      {name: 'room 3', description: ';ag;wgnawogna;ownaw;oiwwa3', host: {name: 'player1'}, players: [], status: '', keyword: ''},
      {name: 'room 4', description: ';ag;wgnawogna;ownaw;oiwwa4', host: {name: 'player1'}, players: [], status: '', keyword: ''},
      {name: 'room 5', description: ';ag;wgnawogna;ownaw;oiwwa5', host: {name: 'player1'}, players: [], status: '', keyword: ''}
    ]
  };

  return o;
});