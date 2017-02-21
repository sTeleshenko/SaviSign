(function () {
  angular
    .module('app')
    .component('loginComponent', {
      templateUrl: 'app/components/login/login.component.html',
      controller: loginComponent,
      controllerAs: 'vm'
    });

  /** @ngInject */
  function loginComponent(Auth, $state, toastr) {
    var vm = this;
    vm.$onInit = function () {
      Auth.logOut();
      vm.data = {};
    };
    vm.login = function () {
      Auth.login(vm.data)
        .then(function () {
          $state.go('home')
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
    };
  }

})();
