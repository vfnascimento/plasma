app.service('LoginService', ['$http', function($http) {
    this.loginUser = function(loginData) {
        return $http.post('https://p722129cq0.execute-api.us-east-1.amazonaws.com/stage/mh-cleaning-amplify-login', loginData);
    };
}]);
