(function () {
  angular
    .module('app')
    .component('serialNumbersListComponent', {
      templateUrl: 'app/components/serial-numbers-list/serial-numbers-list.component.html',
      controller: serialNumbersListComponent,
      controllerAs: 'vm'
    });

  /** @ngInject */
  function serialNumbersListComponent(Serial, localStorageService, $uibModal, toastr, $stateParams) {
    var vm = this;
    vm.$onInit = function () {
      vm.serials = [];
      vm.sortFilters = localStorageService.get('serialsSortFilters') || {
          sort: 'licenseCount',
          order: true
        };
      vm.pagination = {
        page: 1,
        limit: 10
      };
      vm.filters = localStorageService.get('serialsSortFilters') || {};
      vm.loadSerials();
    };

    // vm.onFiltersChanged  = function (filters) {
    //   localStorageService.set('serialsFilters', filters);
    //   vm.filters = filters;
    //   vm.loadSerials();
    // };
    //
    // vm.onSortFiltersChanged = function (key) {
    //   if(vm.sortFilters.sort === key){
    //     vm.sortFilters.order = !vm.sortFilters.order;
    //   } else {
    //     vm.sortFilters.sort = key;
    //     vm.sortFilters.order = true;
    //   }
    //   localStorageService.set('serialsSortFilters', vm.sortFilters);
    //   vm.loadSerials();
    // };

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
      Serial.getSerials(query)
        .then(function (response) {
          vm.serials = response.data.docs;
          vm.pagination.total = response.data.total;
          vm.pagination.page = response.data.page;
        })
        .catch(function () {
          toastr.error('Something went wrong', 'Error');
        });
    };
    // vm.delete = function (serialGroup) {
    //   $uibModal.open({
    //     animation: true,
    //     component: 'confirmComponent',
    //     size: 'sm',
    //     resolve: {
    //       message: function () {
    //         return 'Are you sure to delete serials?';
    //       }
    //     }
    //   }).result.then(function () {
    //     SerialGroup.delete(serialGroup)
    //       .then(function () {
    //         vm.loadSerialGroups();
    //       })
    //       .catch(function () {
    //         toastr.error('Something went wrong', 'Error');
    //       })
    //   });
    // };
  }

})();
