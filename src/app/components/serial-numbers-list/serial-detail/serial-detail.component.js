(function () {
  angular
    .module('app')
    .component('serialDetailComponent', {
      templateUrl: 'app/components/serial-numbers-list/serial-detail/serial-detail.component.html',
      controller: serialDetailComponent,
      controllerAs: 'vm'
    });

  /** @ngInject */
  function serialDetailComponent(Serial, toastr, $scope, $stateParams, $uibModal, Activation, localStorageService ) {
    var vm = this;
    vm.$onInit = function () {
      vm.activations = [];
      vm.loadSerial();
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
        vm.loadSerial();
      }, true);
    };
    vm.loadSerial = function () {
      Serial.getOne($stateParams.id)
        .then(function (response) {
          vm.serial = response.data;
          vm.loadActivations();
        })
        .catch(function () {
          toastr.error('Something went wrong', 'Error');
        });
    };
    vm.activate = function(){
      $uibModal.open({
        component: 'createActivationComponent',
        resolve: {
          serial: function(){
            return vm.serial.key;
          }
        }
      }).result.then(function(){
        vm.loadSerial();
      })
    };
    vm.loadActivations = function(){
      var query = '?serial=' + vm.serial.key + '&';
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
