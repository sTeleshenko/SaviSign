(function () {
  angular
    .module('app')
    .service('Activation', Activation);

  /** @ngInject */
  function Activation($http) {
    var self = this;

    self.getAll = function (query) {
      return $http.get('/api/activations' + query);
    };
    self.create = function (activation) {
      return $http.post('/api/activations', activation);
    };
    self.delete = function(activation) {
        return $http.delete('/api/activations/' + activation._id)
    }
  }
})();
