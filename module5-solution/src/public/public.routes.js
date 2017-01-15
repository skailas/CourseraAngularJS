(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      absract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    })
    .state('public.myinfo', {
      url: '/myinfo',
      templateUrl: 'src/public/myinfo.html',
      controller: 'MyInfoController',
      controllerAs: 'ctrl',
      resolve: {
        favoriteMenuItem: ['DataService', 'MenuService', function(DataService, MenuService) {
          var customer = DataService.getCustomerInformation();
          return MenuService.getMenuItems('').then(function(result){
            var menu_item = {};
            result.menu_items.forEach(function(e){
              if(e.short_name === customer.menuNumber) {
                customer.menuItem = e;
                menu_item = e;
                DataService.setCustomerInformation(customer);
              }
            });
            return menu_item;
          });

        }]
      }

    })
    .state('public.signup', {
      url: '/signup',
      templateUrl: 'src/public/signup.html',
      controller: 'SignupController',
      controllerAs: 'ctrl',
      resolve: {
        menuItems: ['MenuService', function(MenuService){
          return MenuService.getMenuItems('').then(function(result){
            var item_array = [];
            result.menu_items.forEach(function(e){
              item_array.push(e.short_name);
            });
            return item_array;
          });
        }]
      }
    });
}
})();
