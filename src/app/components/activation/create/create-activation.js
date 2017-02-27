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
  function createActivationComponent(Activation, toastr, $uibModal) {
    var vm = this;
    vm.$onInit = function(){
        vm.data = {};
        vm.data.serial = vm.resolve.serial;
    };

    vm.save = function(){
        Activation.create(vm.data)
        .then(function(response){
            // vm.close(response.data);
            if(response.data.status){
                $uibModal.open({
                    component: 'alertComponent',
                    backdrop: false,
                    resolve: {
                        title: function(){
                            return 'Activation Completed'
                        },
                        message: function(){
                            return 'Activation Key: ' + response.data.activationKey
                        }
                    }
                })
                .result.then(function(){
                    vm.close()
                })
            } else{
                toastr.error(response.data.reason, 'Error')
            }
        })
        .catch(function(err){
            toastr.error('Something went wrong', 'Error')
        })
    };
    vm.cancel = function () {
      vm.dismiss({$value: 'cancel'});
    };
  }
})();
