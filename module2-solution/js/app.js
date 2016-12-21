(function() {
  'use-strict';

  angular.module('ShoppingListCheckOff', [])
  .controller("ToBuyController", ToBuyController)
  .controller("AlreadyBoughtController", AlreadyBoughtController)
  .service("ShoppingListCheckOffService", ShoppingListCheckOffService)

  ToBuyController.$inject = ["ShoppingListCheckOffService"];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
    toBuy.items = ShoppingListCheckOffService.getToBuy();
    toBuy.itemsBought = function(index) {
      ShoppingListCheckOffService.itemsBought(index);
    };
    toBuy.noItems = function() {
      return toBuy.items.length == 0;
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;
    alreadyBought.items = ShoppingListCheckOffService.getAlreadyBought();
    alreadyBought.noItems = function() {
      return alreadyBought.items.length == 0;
    };
  }

  function ShoppingListCheckOffService() {
    this.getToBuy = getToBuy;
    this.getAlreadyBought = getAlreadyBought;
    this.itemsBought = itemsBought;
    var toBuyList = [
      {quantity:  6, name: "bag(s) of cookies" },
      {quantity: 4, name: "bag(s) of chips"},
      {quantity:  10, name: "bottle(s) of sugary drinks"},
      {quantity:  5, name: "bottle(s) of Pepto Bismol"},
      {quantity: 1, name: "can(s) of baked beans"}
    ]
    var alreadyBoughtList = [];
    function getToBuy()  {
      return toBuyList;
    }
    function getAlreadyBought()  {
      return alreadyBoughtList;
    }
    function itemsBought(index) {
      var item = toBuyList[index];
      toBuyList.splice(index, 1);
      alreadyBoughtList.push(item);
    }
  }
})();
