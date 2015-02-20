usherApp.controller('airingCtrl', function($scope, $http) {
  $http.get('http://localhost:3000/airing/soon').success(function(data) {
    $scope.soon = data;
  });
  $http.get('http://localhost:3000/airing/today').success(function(data) {
    $scope.today = data;
  });
});
