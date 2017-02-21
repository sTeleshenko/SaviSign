(function () {
  angular
    .module('app')
    .service('Product', Product);

  /** @ngInject */
  function Product($http) {
    var self = this;

    self.getAll = function (query) {
      return $http.get('/api/products' + query);
    };
    self.getProduct = function (id) {
      return $http.get('/api/products/' + id);
    };
    self.createProduct = function (product) {
      return $http.post('/api/products', product)
    };

    self.updateProduct  = function (product) {
      return $http.put('/api/products/' + product._id, product)
    };
    self.deleteProduct = function (product) {
      return $http.delete('/api/products/' + product._id)
    };
  }
})();
