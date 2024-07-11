app.service('UserDataService', ['$http', function($http) {
    this.getUserData = function(cpf) {
        return $http.get('https://rc8q0vydbc.execute-api.us-east-1.amazonaws.com/stage/mh-cleaning-amplify-getdata', { params: { cpf: cpf } });
    };

    this.updateUser = function(user) {
        return $http.put('https://rc8q0vydbc.execute-api.us-east-1.amazonaws.com/stage/mh-cleaning-amplify-getdata', user);
    };
}]);
