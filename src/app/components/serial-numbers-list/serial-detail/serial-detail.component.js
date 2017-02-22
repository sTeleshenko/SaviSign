(function () {
  angular
    .module('app')
    .component('serialDetailComponent', {
      templateUrl: 'app/components/serial-numbers-list/serial-detail/serial-detail.component.html',
      controller: serialDetailComponent,
      controllerAs: 'vm'
    });

  /** @ngInject */
  function serialDetailComponent(Serial, toastr, $stateParams) {
    var vm = this;
    vm.$onInit = function () {
      vm.loadSerial();
      vm.serial = {};
    };
    vm.loadSerial = function () {
      Serial.getOne($stateParams.id)
        .then(function (response) {
          vm.serial = response.data;
        })
        .catch(function () {
          toastr.error('Something went wrong', 'Error');
        });
    }
  }

})();
