(function () {
  angular
    .module('app')
    .component('alertComponent', {
      templateUrl: 'app/components/alert/alert.component.html',
      bindings: {
        resolve: '<',
        close: '&'
      },
      controller: function () {

      },
      controllerAs: 'vm'
    });
})();
