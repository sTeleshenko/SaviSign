(function () {
  angular
    .module('app')
    .service('Serial', Serial);

  /** @ngInject */
  function Serial($http) {
    var self = this;
    self.getSerials = function (query) {
      return $http.get('/api/serials/' + query)
    };
  }
})();
