'use strict';

/* Controllers */

var usherApp = angular.module('usherApp', []);

usherApp.controller('airingCtrl', function($scope, $http) {
    $http.get('http://media.stephenpontes.com:8081/api/453f3e19ecac64c3204d238ba770661f/?cmd=future&sort=date&type=today').success(function(data) {
        $scope.shows = data.data.today;
    });
});
