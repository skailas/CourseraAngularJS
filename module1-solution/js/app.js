(function() {
  'use-strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', function($scope) {
    $scope.state = ""
    $scope.calcNumberItems = function() {
      if ($scope.fooditems) {
        var items = $scope.fooditems
        var lunch = items.split(",")
        return lunch.length;
      }
      else {
        return 0;
      }
    };
    $scope.printState = function() {
      var total = $scope.calcNumberItems();
      if (total === 0) {
        $scope.state = "Please enter data first!"
      }
      else if (total <= 3) {
        $scope.state = "Enjoy!"
      }
      else if (total > 3) {
        $scope.state = "Too much!"
      }
    }
  })
})();
