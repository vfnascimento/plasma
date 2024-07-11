app.service('UserService', ['$http', function($http) {
    this.registerUser = function(user) {
        return $http.post('https://kztfp0t7ql.execute-api.us-east-1.amazonaws.com/stage/mh-cleaning-amplify-register', user);
    };
}]);
