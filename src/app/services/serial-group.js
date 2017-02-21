(function () {
  angular
    .module('app')
    .service('SerialGroup', SerialGroup);

  /** @ngInject */
  function SerialGroup($http) {
    var self = this;

    self.getAll = function (query) {
      return $http.get('/api/serial-groups' + query);
    };
    self.getOne = function (id) {
      return $http.get('/api/serial-groups/' + id);
    };
    self.create = function (serialGroup) {
      return $http.post('/api/serial-groups', serialGroup)
    };

    self.update  = function (serialGroup) {
      return $http.put('/api/serial-groups/' + serialGroup._id, serialGroup)
    };
    self.delete = function (serialGroup) {
      return $http.delete('/api/serial-groups/' + serialGroup._id)
    };
  }
})();
