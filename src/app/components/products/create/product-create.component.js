(function () {
  angular
    .module('app')
    .component('createProductComponent', {
      templateUrl: 'app/components/products/create/product-create.component.html',
      bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
      },
      controller: createProductComponent,
      controllerAs: 'vm'
    });

  /** @ngInject */
  function createProductComponent(Product, toastr) {
    var vm = this;
    vm.$onInit = function () {
      vm.product = vm.resolve.product;
    };
    vm.cancel = function () {
      vm.dismiss({$value: 'cancel'});
    };
    vm.save = function () {
      if(vm.product._id){
        Product.updateProduct(vm.product)
          .then(function () {
            vm.close({$value: vm.product});
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
        Product.createProduct(vm.product)
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
    }
  }
})();
