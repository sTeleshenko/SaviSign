(function () {
  angular
    .module('app')
    .component('createActivationComponent', {
      templateUrl: 'app/components/activation/create/create-activation.html',
      controller: createActivationComponent,
      controllerAs: 'vm',
      bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
      }
    });

  /** @ngInject */
  function createActivationComponent(Activation) {
    var vm = this;
    vm.$onInit = function(){
        vm.data = {};
        vm.data.serial = vm.resolve.serial;
    }

    vm.save = function(){
        Activation.create(vm.data)
    }
  }
})();
