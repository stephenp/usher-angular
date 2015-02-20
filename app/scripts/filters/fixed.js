angular.module('usherApp')
    .filter('truncateTo', function() {
        return function(input, places) {
            return Number(input).toFixed(places);
        }
    })
