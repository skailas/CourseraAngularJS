(function(angular) {

angular.module("MenuApp").controller("ItemsController", ItemsController);

ItemsController.$inject = ["itemsData"];
function ItemsController(itemsData) {
    var $ctrl = this;

    $ctrl.category = itemsData.category;
    $ctrl.items = itemsData.menu_items;
}

})(angular);
