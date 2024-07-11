app.service('UserService', ['$http', function($http) {
    this.registerUser = function(user) {
        return $http.post('https://seu-api-gateway-url/endpoint', user);
    };
}]);
