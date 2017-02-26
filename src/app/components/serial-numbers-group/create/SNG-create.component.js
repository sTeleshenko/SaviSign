(function () {
  angular
    .module('app')
    .component('createSerialGroupComponent', {
      templateUrl: 'app/components/serial-numbers-group/create/SNG-create.component.html',
      bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
      },
      controller: createSerialGroupComponent,
      controllerAs: 'vm'
    });

  /** @ngInject */
  function createSerialGroupComponent(SerialGroup, Product, toastr) {
    var vm = this;
    vm.$onInit = function () {
      vm.serialGroup = vm.resolve.serialGroup;
      vm.loadProducts();
    };
    vm.cancel = function () {
      vm.dismiss({$value: 'cancel'});
    };
    vm.save = function () {
      if(vm.serialGroup._id){
        SerialGroup.update(vm.serialGroup)
          .then(function () {
            vm.close({$value: vm.serialGroup});
          })
          .catch(function (error) {
            var message;
            if (error.data && error.data.message) {
              message = error.data.message;
            } else {
              message = 'Something went wrong';
            }
            toastr.error(message, 'Error');
          });
      } else {
        SerialGroup.create(vm.serialGroup)
          .then(function (response) {
            vm.close({$value: response.data});
          })
          .catch(function (error) {
            var message;
            if (error.data && error.data.message) {
              message = error.data.message;
            } else {
              message = 'Something went wrong';
            }
            toastr.error(message, 'Error');
          });
      }
    };

    vm.loadProducts = function () {
      Product.getAll('')
        .then(function (response) {
          vm.products = response.data.docs;
        })
    };
  }
})();
