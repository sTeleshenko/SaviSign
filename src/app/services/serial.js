(function () {
  angular
    .module('app')
    .service('Serial', Serial);

  /** @ngInject */
  function Serial($http) {
    var self = this;
    self.getAll = function (query) {
      return $http.get('/api/serials/' + query)
    };
    self.getOne = function (id) {
      return $http.get('/api/serials/' + id);
    };
    self.delete = function (serial) {
      return $http.delete('/api/serials/' + serial._id)
    };
  }
})();
