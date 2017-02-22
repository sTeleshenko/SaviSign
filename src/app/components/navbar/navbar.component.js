(function () {
  angular
    .module('app')
    .component('navbarComponent', {
      templateUrl: 'app/components/navbar/navbar.component.html',
      controller: NavbarController,
      controllerAs: 'vm'
    });

  /** @ngInject */
  function NavbarController(Auth, $http, $timeout) {
    var vm = this;
    vm.$onInit = function () {
      vm.searchText = '';
      vm.resultNotFound = false;
      vm.searchResults = {
        serials: [],
        serialGroups: [],
        products: []
      };
      vm.isNavCollapsed = false;
      Auth.getCurrentUser()
        .then(function (user) {
          vm.user = user;
        });
    };

    vm.search = function () {
      if (vm.searchText.length){
        $http.get('/api/search/' + vm.searchText)
          .then(function (response) {
            vm.searchResults = response.data;
            vm.resultNotFound = !vm.searchResults.serials.length &&
                                !vm.searchResults.serialGroups.length &&
                                !vm.searchResults.products.length;
          })
      } else  {
        vm.resultNotFound = false;
        vm.searchResults = {
          serials: [],
          serialGroups: [],
          products: []
        };
      }
    };

    vm.changeFocus = function () {
      $timeout(function () {
        vm.focus = !vm.focus;
      }, 300)
    }
  }
})();
