(function() {
    "use strict";

    angular
    .module("NarrowItDownApp", [])
    .directive("foundItems", FoundItemsDirective)
    .controller("FoundItemsDirectiveController", FoundItemsDirectiveController)
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .constant("restaurantApiBaseUrl", "https://davids-restaurant.herokuapp.com");


    Array.prototype.any = function() {
        return this.length >= 1;
    }


    function FoundItemsDirective() {
        return {
            restrict: "E",
            templateUrl: "found-items.html",
            scope: {
                items: "<",
                onRemove: "&"
            },
            controller: "FoundItemsDirectiveController as dirCtrl",
            bindToController: true
        };
    }


    function FoundItemsDirectiveController() {
        var dirCtrl = this;
    }


    NarrowItDownController.$inject = ["MenuSearchService"];
    function NarrowItDownController(menuSearchService) {
        var narrowItDown = this;

        narrowItDown.message = "";
        narrowItDown.removeItem = removeItem;
        narrowItDown.searchTerm = "";
        narrowItDown.search = search;
        narrowItDown.searchInProgress = false;
        narrowItDown.shouldShowMessage = function() { return narrowItDown.message && !narrowItDown.searchInProgress; };
        narrowItDown.found = null;

        function removeItem(itemIndex) {
            if (narrowItDown.found !== null) {
                narrowItDown.found.splice(itemIndex, 1);
                if (!narrowItDown.found.any()) {
                    narrowItDown.message = "Nothing remaining.";
                }
            }
        }

        function search() {
            if (narrowItDown.searchTerm.trim().length > 0)
            {
                narrowItDown.searchInProgress = true;
                menuSearchService
                .getMatchedMenuItems(narrowItDown.searchTerm)
                .then(function(found) {
                    narrowItDown.searchInProgress = false;
                    narrowItDown.found = found;
                    narrowItDown.message = narrowItDown.found.any() ? "" : "Nothing found.";
                })
                .catch(function(error) {
                    narrowItDown.searchInProgress = false;
                    narrowItDown.found = null;
                    narrowItDown.message = error.message;
                });
            }
            else
            {
                narrowItDown.found = null;
                narrowItDown.message = "Nothing found.";
            }
        }
    }


    MenuSearchService.$inject = ["$http", "restaurantApiBaseUrl"];
    function MenuSearchService($http, restaurantApiBaseUrl) {
        var service = this;

        service.getMatchedMenuItems = getMatchedMenuItems;

        function getMatchedMenuItems(searchTerm) {

            return $http({
                method: "GET",
                url: restaurantApiBaseUrl + "/menu_items.json"
            })
            .then(function(response) {
                return response.data.menu_items.filter(containsIn("description", searchTerm));

                function containsIn(property, subStr) {
                    subStr = subStr.toLowerCase();
                    return function(item) {
                        return item[property].toLowerCase().indexOf(subStr) >= 0;
                    };
                }
            })
            .catch(function(errorResponse) {
                throw new Error("Something went wrong when trying to fetch menu items.");
            });
        }
    }

})();
