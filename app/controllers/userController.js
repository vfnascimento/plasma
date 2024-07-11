app.controller('UserController', ['$scope', 'UserService', function($scope, UserService) {
    $scope.user = {};

    $scope.init = function() {
        var urlParams = new URLSearchParams(window.location.search);
        $scope.user.chat_id = urlParams.get('chatid');
    };

    $scope.submitForm = function() {
        UserService.registerUser($scope.user).then(function(response) {
            if (response.status === 200) {
                alert("Cadastro efetuado com sucesso!");
            } else {
                alert("Erro ao efetuar cadastro.");
            }
        }).catch(function(error) {
            console.error("Erro:", error);
            alert("Erro ao conectar com o servidor.");
        });
    };

    $scope.init();
}]);
