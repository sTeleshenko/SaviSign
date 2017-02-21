(function () {
  angular
    .module('app')
    .component('mainComponent', {
      templateUrl: 'app/components/main/main.component.html',
      controller: mainComponent,
      controllerAs: 'vm'
    });

  /** @ngInject */
  function mainComponent() {
    var vm = this;
  }

})();
