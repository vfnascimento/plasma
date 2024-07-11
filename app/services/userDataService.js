app.service('UserDataService', ['$http', function($http) {
    this.getUserData = function(cpf) {
        return $http.get('https://seu-api-gateway-url/endpoint', { params: { cpf: cpf } });
    };

    this.updateUser = function(user) {
        return $http.put('https://seu-api-gateway-url/endpoint', user);
    };
}]);
