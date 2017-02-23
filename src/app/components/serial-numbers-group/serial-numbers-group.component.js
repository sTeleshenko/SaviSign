(function () {
  angular
    .module('app')
    .component('serialNumbersGroupComponent', {
      templateUrl: 'app/components/serial-numbers-group/serial-numbers-group.component.html',
      controller: serialNumberGroupComponent,
      controllerAs: 'vm'
    });

  /** @ngInject */
  function serialNumberGroupComponent(SerialGroup, localStorageService, $uibModal, toastr, $state, $stateParams, $scope) {
    var vm = this;
    vm.$onInit = function () {
      vm.serialGroups = [];
      vm.sortFilters = localStorageService.get('serialGroupSortFilters') || {
          sort: 'docIndex',
          order: true
        };
      vm.pagination = {
        page: 1,
        limit: 10
      };
      if ($stateParams.productId || $stateParams.serialPrefix) {
        vm.filters = {
          productId: $stateParams.productId,
          serialPrefix: $stateParams.serialPrefix
        };
        localStorageService.set('serialGroupFilters', vm.filters);
      } else {
        vm.filters = localStorageService.get('serialGroupFilters') || {};
        $state.transitionTo('serialGroups', vm.filters);
      }
      vm.filters = localStorageService.get('serialGroupFilters') || {};
      $scope.$watch('vm.filters', vm.onFiltersChanged, true);
      vm.loadSerialGroups();
    };

    vm.uiOnParamsChanged = function (newParams) {
      for (var key in newParams) {
        if (vm.filters[key] !== newParams[key]) {
          vm.filters[key] = newParams[key];
        }
      }
    };

    vm.onFiltersChanged  = function () {
      $state.transitionTo('serialGroups', vm.filters);
      localStorageService.set('serialGroupFilters', vm.filters);
      vm.loadSerialGroups();
    };

    vm.resetFilters = function () {
      vm.filters = {};
    };

    vm.onSortFiltersChanged = function (key) {
      if(vm.sortFilters.sort === key){
        vm.sortFilters.order = !vm.sortFilters.order;
      } else {
        vm.sortFilters.sort = key;
        vm.sortFilters.order = true;
      }
      localStorageService.set('serialGroupSortFilters', vm.sortFilters);
      vm.loadSerialGroups();
    };

    vm.loadSerialGroups = function () {
      var query = '?';
      for(var key in vm.filters) {
        if(vm.filters[key]){
          query = query + key + '=' + vm.filters[key] + '&'
        }
      }
      query = query + 'sort=' + (vm.sortFilters.order ? '' : '-') + vm.sortFilters.sort + '&';
      query = query + 'page=' + vm.pagination.page + '&';
      query = query + 'limit=' + vm.pagination.limit;
      SerialGroup.getAll(query)
        .then(function (response) {
          vm.serialGroups = response.data.docs;
          vm.pagination.total = response.data.total;
          vm.pagination.page = response.data.page;
        })
        .catch(function () {
          toastr.error('Something went wrong', 'Error');
        });
    };

    vm.openAddSerialModal = function (serialGroup, index) {
      var modalInstance = $uibModal.open({
        animation: true,
        component: 'createSerialNumberComponent',
        resolve: {
          serialGroup: function () {
            return angular.copy(serialGroup);
          }
        }
      });

      modalInstance.result.then(function () {
        vm.loadSerialGroups();
      });
    };
    vm.delete = function (serialGroup) {
      $uibModal.open({
        animation: true,
        component: 'confirmComponent',
        size: 'sm',
        resolve: {
          message: function () {
            return 'Are you sure to delete serials group?';
          }
        }
      }).result.then(function () {
        SerialGroup.delete(serialGroup)
          .then(function () {
            vm.loadSerialGroups();
          })
          .catch(function () {
            toastr.error('Something went wrong', 'Error');
          })
      });
    };
  }
})();
