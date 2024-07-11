app.service('LoginService', ['$http', function($http) {
    this.loginUser = function(loginData) {
        return $http.post('https://seu-api-gateway-url/endpoint', loginData);
    };
}]);
