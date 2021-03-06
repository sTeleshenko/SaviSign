(function () {
  angular
    .module('app')
    .component('productsComponent', {
      templateUrl: 'app/components/products/products.component.html',
      controller: productsComponent,
      controllerAs: 'vm'
    });

  /** @ngInject */
  function productsComponent(Product, localStorageService, $uibModal, toastr, $stateParams, $state, $scope) {
    var vm = this;
    vm.$onInit = function () {
      vm.products = [];
      vm.sortFilters = localStorageService.get('productSortFilters') || {
        sort: 'productId',
        order: true
      };
      vm.pagination = {
        page: 1,
        limit: 10
      };
      if ($stateParams.productId || $stateParams.name) {
        vm.filters = {
          productId: $stateParams.productId,
          name: $stateParams.name
        };
        localStorageService.set('productFilters', vm.filters);
      } else {
        vm.filters = localStorageService.get('productFilters') || {};
        $state.transitionTo('products', vm.filters);
      }
      vm.loadProducts();
      $scope.$watch('vm.filters', vm.onFiltersChanged, true);
    };

    vm.uiOnParamsChanged = function (newParams) {
      for (var key in newParams) {
        if (vm.filters[key] !== newParams[key]) {
          vm.filters[key] = newParams[key];
        }
      }
    };

    vm.onFiltersChanged = function () {
      $state.transitionTo('products', vm.filters);
      localStorageService.set('productFilters', vm.filters);
      vm.loadProducts();
    };

    vm.resetFilters = function () {
      vm.filters = {};
    };

    vm.onSortFiltersChanged = function (key) {
      if (vm.sortFilters.sort === key) {
        vm.sortFilters.order = !vm.sortFilters.order;
      } else {
        vm.sortFilters.sort = key;
        vm.sortFilters.order = true;
      }
      localStorageService.set('productSortFilters', vm.sortFilters);
      vm.loadProducts();
    };

    vm.loadProducts = function () {
      var query = '?';
      for (var key in vm.filters) {
        if (vm.filters[key]) {
          query = query + key + '=' + vm.filters[key] + '&'
        }
      }
      query = query + 'sort=' + (vm.sortFilters.order ? '' : '-') + vm.sortFilters.sort + '&';
      query = query + 'page=' + vm.pagination.page + '&';
      query = query + 'limit=' + vm.pagination.limit;
      Product.getAll(query)
        .then(function (response) {
          vm.products = response.data.docs;
          vm.pagination.total = response.data.total;
          vm.pagination.page = response.data.page;
        })
        .catch(function () {
          toastr.error('Something went wrong', 'Error');
        });
    };

    vm.openProductModal = function (product, index) {
      var modalInstance = $uibModal.open({
        animation: true,
        component: 'createProductComponent',
        resolve: {
          product: function () {
            return angular.copy(product);
          }
        }
      });

      modalInstance.result.then(function () {
        vm.loadProducts();
      });
    };
    vm.delete = function (product) {
      $uibModal.open({
        animation: true,
        component: 'confirmComponent',
        size: 'sm',
        resolve: {
          message: function () {
            return 'Are you sure to delete product ' + product.productId + '?';
          }
        }
      }).result.then(function () {
        Product.deleteProduct(product)
          .then(function () {
            vm.loadProducts();
          })
          .catch(function () {
            toastr.error('Something went wrong', 'Error');
          })
      });
    };
  }
})();
