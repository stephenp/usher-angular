usherApp.controller('statsCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('http://localhost:3000/stats').success(function(data) {
      $scope.stats = data;
    });
}]);
