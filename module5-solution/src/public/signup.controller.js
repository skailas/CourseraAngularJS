(function() {
  "use strict";

  angular.module('public').controller("SignupController", SignupController);

  SignupController.$inject = ['DataService', 'menuItems'];
  function SignupController(DataService, menuItems) {
    var myself = this;
    myself.customer = DataService.getCustomerInformation();
    myself.menuNumberExists = true;

    myself.submitForm = function() {
      myself.customer.registered = true;
      DataService.setCustomerInformation(myself.customer);
      if(menuItems.indexOf(myself.customer.menuNumber) == -1) {
        myself.menuNumberExists = false;
      } else {
        myself.menuNumberExists = true;
      }
    };
  }
})();
