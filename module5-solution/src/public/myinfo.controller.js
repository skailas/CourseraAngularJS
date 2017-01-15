(function(){
  "use strict";

  angular.module('public').controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['DataService', 'favoriteMenuItem']
  function MyInfoController(DataService, favoriteMenuItem) {
    var myself = this;

    myself.customer = DataService.getCustomerInformation();
  }

})();
