(function () {
  "use strict";

  angular.module('data').service('DataService', DataService);

  //DataService.$inject = [];

  // singleton ???
  function DataService() {
    var myself = this;
    myself.customerInformation = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      phoneNumber: '',
      menuNumber: '',
      registered: false
    };

    myself.getCustomerInformation = function() {
      return myself.customerInformation;
    };

    myself.setCustomerInformation = function(customer) {
      myself.customerInformation = customer;
    };

  }

})();
