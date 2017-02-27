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
          loadActivations: '&',
          filters: '='
      },
      controllerAs: 'vm'
    });

  /** @ngInject */
  function activationsComponent(localStorageService, Activation, $uibModal, toastr) {
    var vm = this;
    vm.onSortFiltersChanged = function (key) {
      if (vm.sortFilters.sort === key) {
        vm.sortFilters.order = !vm.sortFilters.order;
      } else {
        vm.sortFilters.sort = key;
        vm.sortFilters.order = true;
      }
      localStorageService.set('activationsSortFilters', vm.sortFilters);
      vm.loadActivations();
    };
    vm.reset = function () {
      vm.filters = {}
    };
    vm.showKey = function (activation) {
      $uibModal.open({
        component: 'alertComponent',
        backdrop: false,
        resolve: {
          title: function(){
            return 'Activation Key'
          },
          message: function(){
            return activation.activationKey;
          }
        }
      });
    };
    vm.delete = function(activation){
        $uibModal.open({
        animation: true,
        component: 'confirmComponent',
        size: 'sm',
        resolve: {
          message: function () {
            return 'Are you sure to delete this record?';
          }
        }
      }).result.then(function(){
        Activation.delete(activation)
        .then(function(){
            vm.loadActivations()
        })
        .catch(function () {
          toastr.error('Something went wrong', 'Error');
        });
      })
    }
  }
})();
