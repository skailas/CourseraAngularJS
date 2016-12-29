(function() {
    "use strict";

    angular
    .module("NarrowItDownApp", [])
    .directive("itemFound", itemFoundDirective)
    .controller("itemFoundDirectiveController", itemFoundDirectiveController)
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService);


    Array.prototype.any = function() {
        return this.length >= 1;
    }


    function itemFoundDirective() {
        return {
            restrict: "E",
            templateUrl: "itemFound.html",
            scope: {
                items: "<",
                onRemove: "&"
            },
            controller: "itemFoundDirectiveController as iFDC",
            bindToController: true
        };
    }


    function itemFoundDirectiveController() {
        var iFDC = this;
    }


    NarrowItDownController.$inject = ["MenuSearchService"];
    function NarrowItDownController(menuSearchService) {
        var NarrowItDown = this;

        NarrowItDown.message = "";
        NarrowItDown.removeItem = removeItem;
        NarrowItDown.searchTerm = "";
        NarrowItDown.search = search;
        NarrowItDown.searchInProgress = false;
        NarrowItDown.shouldShowMessage = function() { return NarrowItDown.message && !NarrowItDown.searchInProgress; };
        NarrowItDown.found = null;

        function removeItem(itemIndex) {
            if (NarrowItDown.found !== null) {
                NarrowItDown.found.splice(itemIndex, 1);
                if (!NarrowItDown.found.any()) {
                    NarrowItDown.message = "Nothing remaining.";
                }
            }
        }

        function search() {
            if (NarrowItDown.searchTerm.trim().length > 0)
            {
                NarrowItDown.searchInProgress = true;
                menuSearchService
                .getMatchedMenuItems(NarrowItDown.searchTerm)
                .then(function(found) {
                    NarrowItDown.searchInProgress = false;
                    NarrowItDown.found = found;
                    NarrowItDown.message = NarrowItDown.found.any() ? "" : "Nothing found.";
                })
                .catch(function(error) {
                    NarrowItDown.searchInProgress = false;
                    NarrowItDown.found = null;
                    NarrowItDown.message = error.message;
                });
            }
            else
            {
                NarrowItDown.found = null;
                NarrowItDown.message = "Nothing found.";
            }
        }
    }


    MenuSearchService.$inject = ["$http"];
    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = getMatchedMenuItems;

        function getMatchedMenuItems(searchTerm) {

            return $http({
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com/menu_items.json"
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
