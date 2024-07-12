// userController.js
var app = angular.module('userApp', []);

app.controller('UserController', ['$scope', '$http', function($scope, $http) {
    // Inicializar o objeto user
    $scope.user = {
        chat_id: '',
        cpf: '',
        nome: '',
        sobrenome: '',
        email: '',
        telefone: ''
    };

    // Carregar o chat_id da URL
    $scope.init = function() {
        var urlParams = new URLSearchParams(window.location.search);
        $scope.user.chat_id = urlParams.get('chatid');
    };

    // Função para enviar os dados do usuário
    $scope.registerUser = function() {
        var payload = {
            chat_id: $scope.user.chat_id,
            cpf: $scope.user.cpf,
            nome: $scope.user.nome,
            sobrenome: $scope.user.sobrenome,
            email: $scope.user.sobrenome,
            telefone: $scope.user.telefone
        };

        $http.post('https://seu-api-gateway-url/endpoint', payload)
            .then(function(response) {
                if (response.status === 200) {
                    alert("Cadastro efetuado com sucesso!");
                } else {
                    alert("Erro ao efetuar cadastro.");
                }
            })
            .catch(function(error) {
                console.error("Erro:", error);
                alert("Erro ao conectar com o servidor.");
            });
    };

    // Inicializar o controller
    $scope.init();
}]);
