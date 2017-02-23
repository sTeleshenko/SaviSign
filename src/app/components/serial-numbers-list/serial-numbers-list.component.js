(function () {
  angular
    .module('app')
    .component('serialNumbersListComponent', {
      templateUrl: 'app/components/serial-numbers-list/serial-numbers-list.component.html',
      controller: serialNumbersListComponent,
      controllerAs: 'vm'
    });

  /** @ngInject */
  function serialNumbersListComponent(Serial ,SerialGroup, $scope, localStorageService, $uibModal, toastr, $stateParams) {
    var vm = this;
    vm.$onInit = function () {
      vm.serials = [];
      vm.getThisGroup();
      vm.thisGroup = {};
      vm.sortFilters = localStorageService.get('serialsSortFilters') || {
          sort: 'docIndex',
          order: true
        };
      vm.pagination = {
        page: 1,
        limit: 10
      };
      vm.filters = localStorageService.get('serialsFilters') || {};
      $scope.$watch('vm.filters', function () {
        vm.loadSerials();
      }, true);
    };

    vm.getThisGroup = function() {
      SerialGroup.getOne($stateParams.id)
        .then(function (response) {
          vm.thisGroup = response.data;
        })
    };

    vm.search  = function () {
      localStorageService.set('serialsFilters', vm.filters);

      vm.loadSerials();
    };
    vm.reset = function () {
      vm.filters = {};
    };

    vm.onSortFiltersChanged = function (key) {
      if(vm.sortFilters.sort === key){
        vm.sortFilters.order = !vm.sortFilters.order;
      } else {
        vm.sortFilters.sort = key;
        vm.sortFilters.order = true;
      }
      localStorageService.set('serialsSortFilters', vm.sortFilters);
      vm.loadSerials();
    };

    vm.loadSerials = function () {
      var query = '?' + 'serialGroup=' + $stateParams.id + '&';
      for(var key in vm.filters) {
        if(vm.filters[key]){
          query = query + key + '=' + vm.filters[key] + '&'
        }
      }
      query = query + 'sort=' + (vm.sortFilters.order ? '' : '-') + vm.sortFilters.sort + '&';
      query = query + 'page=' + vm.pagination.page + '&';
      query = query + 'limit=' + vm.pagination.limit;
      Serial.getAll(query)
        .then(function (response) {
          vm.serials = response.data.docs;
          vm.pagination.total = response.data.total;
          vm.pagination.page = response.data.page;
        })
        .catch(function () {
          toastr.error('Something went wrong', 'Error');
        });
    };
    vm.delete = function (serial) {
      $uibModal.open({
        animation: true,
        component: 'confirmComponent',
        size: 'sm',
        resolve: {
          message: function () {
            return 'Are you sure to delete serial?';
          }
        }
      }).result.then(function () {
        Serial.delete(serial)
          .then(function () {
            vm.loadSerials();
          })
          .catch(function () {
            toastr.error('Something went wrong', 'Error');
          })
      });
    };
  }

})();
