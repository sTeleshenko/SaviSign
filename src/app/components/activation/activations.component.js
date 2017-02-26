(function () {
  angular
    .module('app')
    .component('activationsComponent', {
      templateUrl: 'app/components/activation/activations.component.html',
      controller: activationsComponent,
      controllerAs: 'vm'
    });

  /** @ngInject */
  function activationsComponent() {
    var vm = this;

  }
})();
