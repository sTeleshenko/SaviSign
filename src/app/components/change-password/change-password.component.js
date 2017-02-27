(function () {
  angular
    .module('app')
    .component('changePasswordComponent', {
      templateUrl: 'app/components/change-password/change-password.component.html',
      controller: changePassword,
      controllerAs: 'vm',
      bindings: {
        close: '&'
      }
    });

  /** @ngInject */
  function changePassword($http, toastr) {
    var vm = this;
    vm.$onInit = function () {
      vm.password = {};
    };
    vm.save = function () {
      $http.post('/api/users/password', vm.password)
        .then(function () {
          toastr.success('Password changed', 'Success');
          vm.close();
        })
        .catch(function(){
          toastr.error('Something went wrong', 'Error');
        });
    }
  }

})();
