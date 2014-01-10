'use strict';

angular.module('binauralBeatsApp')
  .controller('MainCtrl', function ($scope, $window) {

    $scope.freq = 95; // base frequency
    $scope.freqA = 9;
    $scope.freqB = 11;
    $scope.playA = true;
    $scope.playB = true;
    $scope.panA = 0;
    $scope.panB = 100;
    
    var a = T("sin", {freq: $scope.freq, mul: 0.25});
    var b = T("sin", {freq: $scope.freq, mul: 1});
    var aa = T("pan", {pos: $scope.panA}, a).play();
    var bb = T("pan", {pos: $scope.panB}, b).play();

    $scope.toggleA = function () {
        $scope.playA = !$scope.playA;
        aa[$scope.playA ? 'play' : 'pause']();
    };

    $scope.toggleB = function () {
        $scope.playB = !$scope.playB;
        bb[$scope.playB ? 'play' : 'pause']();
    };

    $scope.changeFreq = function () {
        a.freq.value = $scope.freq + ($scope.freqA - 10);
        b.freq.value = $scope.freq + ($scope.freqB - 10);
    };

    $scope.beatFreq = function(){
        return $window.Math.abs($scope.freqA - $scope.freqB);
    };

    $scope.$watch('freq', function (newval, oldval) {
        a.freq.value = $scope.freq + ($scope.freqA - 10);
        b.freq.value = $scope.freq + ($scope.freqB - 10);
    });

    $scope.$watch('panA', function (newval, oldval) {
        console.log('panA', arguments)
        aa.pos.value = Number(newval)/100;
    });

    $scope.$watch('panB', function (newval, oldval) {
        bb.pos.value = Number(newval)/100;
    });
  });
