(function(angular) {

angular.module("MenuApp").component("categories", {
    templateUrl: "menuapp.categories.component.html",
    bindings: {
        categories: "<"
    }
});

})(angular);
