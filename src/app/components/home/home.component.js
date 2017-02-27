(function () {
  angular
    .module('app')
    .component('homeComponent', {
      templateUrl: 'app/components/home/home.component.html',
      controller: homeComponent,
      controllerAs: 'vm'
    });

  /** @ngInject */
  function homeComponent($uibModal, Activation, localStorageService, $scope, toastr) {
    var vm = this;
    vm.$onInit = function () {
      vm.activations = [];
      vm.sortFilters = localStorageService.get('activationsSortFilters') || {
        sort: 'dateCreate',
        order: true
      };
      vm.pagination = {
        page: 1,
        limit: 10
      };
      vm.filters = localStorageService.get('activationFilters') || {};
      $scope.$watch('vm.filters', function () {
        localStorageService.set('activationFilters', vm.filters);
        vm.loadActivations();
      }, true);
    };

    vm.activate = function(){
      $uibModal.open({
        component: 'createActivationComponent'
      }).result.then(function(){
        vm.loadActivations();
      })
    };
    vm.loadActivations = function(){
      var query = '?';
      for(var key in vm.filters) {
        if(vm.filters[key]){
          query = query + key + '=' + vm.filters[key] + '&'
        }
      }
      query = query + 'sort=' + (vm.sortFilters.order ? '' : '-') + vm.sortFilters.sort + '&';
      query = query + 'page=' + vm.pagination.page + '&';
      query = query + 'limit=' + vm.pagination.limit;
      Activation.getAll(query)
        .then(function(response){
          vm.activations = response.data.docs;
          vm.pagination.total = response.data.total;
          vm.pagination.page = response.data.page;
        })
        .catch(function () {
          toastr.error('Something went wrong', 'Error');
        });
    }

  }
})();
