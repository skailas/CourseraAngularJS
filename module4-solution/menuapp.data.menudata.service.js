(function(angular) {

angular.module("MenuApp.data").service("MenuDataService", MenuDataService);

MenuDataService.$inject = ["$http"];
function MenuDataService($http) {

    this.getAllCategories = function() {
        return $http.get("https://davids-restaurant.herokuapp.com/categories.json")
                    .then(function(response) {
            return response.data;
        });
    };

    this.getItemsForCategory = function(categoryShortName) {
        return $http.get("https://davids-restaurant.herokuapp.com/menu_items.json", 
                         { params: { "category": categoryShortName }})
                    .then(function(response) {
            return response.data;
        });
    };
}

})(angular);
