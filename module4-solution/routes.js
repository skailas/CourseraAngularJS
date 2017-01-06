(function(angular) {

angular.module("MenuApp").config(routes);

routes.$inject = ["$stateProvider", "$urlRouterProvider"];
function routes($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider.state("home", {
        url: "/",
        templateUrl: "menuapp.home.state.html"
    });

    $stateProvider.state("categories", {
        url: "/categories",
        resolve: {
            categories: ["MenuDataService", function(menuDataService) {
                return menuDataService.getAllCategories();
            }]
        },
        controller: "CategoriesController as $ctrl",
        templateUrl: "menuapp.categories.state.html"
    });

    $stateProvider.state("items", {
        url: "/categories/{categoryShortName}/items",
        resolve: {
            itemsData: ["$stateParams", "MenuDataService", function($stateParams, menuDataService) {
                return menuDataService.getItemsForCategory($stateParams.categoryShortName);
            }]
        },
        controller: "ItemsController as $ctrl",
        templateUrl: "menuapp.items.state.html"
    });
}

})(angular);
