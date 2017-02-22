(function () {
  angular
    .module('app')
    .component('searchResultsComponent', {
      templateUrl: 'app/components/search-result/search-result.component.html',
      controller: searchResultComponent,
      controllerAs: 'vm',
      bindings: {
        results: '<',
        resultNotFound: '<'
      }
    });

  /** @ngInject */
  function searchResultComponent() {
    var vm = this;
  }

})();
