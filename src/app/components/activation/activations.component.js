(function () {
  angular
    .module('app')
    .component('activationsComponent', {
      templateUrl: 'app/components/activation/activations.component.html',
      controller: activationsComponent,
      bindings: {
          activations: '<',
          sortFilters: '=',
          pagination: '=',
          loadActivations: '&'
      },
      controllerAs: 'vm'
    });

  /** @ngInject */
  function activationsComponent(localStorageService) {
    var vm = this;
    vm.onSortFiltersChanged = function (key) {
      if (vm.sortFilters.sort === key) {
        vm.sortFilters.order = !vm.sortFilters.order;
      } else {
        vm.sortFilters.sort = key;
        vm.sortFilters.order = true;
      }
      localStorageService.set('productSortFilters', vm.sortFilters);
      vm.loadActivations();
    };
  }
})();
