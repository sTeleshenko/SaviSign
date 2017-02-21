(function () {
  angular
    .module('app')
    .component('homeComponent', {
      templateUrl: 'app/components/home/home.component.html',
      controller: homeComponent,
      controllerAs: 'vm'
    });

  /** @ngInject */
  function homeComponent() {
    var vm = this;

  }
})();
