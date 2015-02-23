usherApp.controller('statsCtrl', ['$scope', '$http',
  function ($scope, $http) {
    function updateStats() {
        $http.get('http://localhost:3000/stats').success(function(data) {
          $scope.stats = data;
        });
    }

    setInterval(function () {updateStats()}, 1500);

}]);
