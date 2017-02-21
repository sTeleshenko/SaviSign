angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', {
      abstract: true,
      component: 'mainComponent'
    })
.state('login', {
    url: '/login',
    component: 'loginComponent'
  })
    .state('home', {
      url: '/',
      parent: 'main',
      component: 'homeComponent',
      data: {
        roles: ['admin']
      }
    })
    .state('products', {
      url: '/products',
      parent: 'main',
      component: 'productsComponent',
      data: {
        roles: ['admin']
      }
    })
    .state('serialGroups', {
      url: '/serialGroups',
      parent: 'main',
      component: 'serialNumbersGroupComponent',
      data: {
        roles: ['admin']
      }
    })
    .state('serialNumbersList', {
      url: '/serialNumbers/:id',
      parent: 'main',
      component: 'serialNumbersListComponent',
      data: {
        roles: ['admin']
      }
    })

}
