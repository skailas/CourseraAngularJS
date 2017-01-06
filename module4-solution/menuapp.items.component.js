(function(angular) {

angular.module("MenuApp").component("items", {
    bindings: {
        items: "<"
    },
    templateUrl: "menuapp.items.component.html"
});

})(angular);
