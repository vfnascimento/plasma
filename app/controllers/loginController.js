app.controller('LoginController', ['$scope', 'LoginService', function($scope, LoginService) {
    $scope.login = {};

    $scope.submitLogin = function() {
        const code = Math.floor(100000 + Math.random() * 900000);  // Gerar código de 6 dígitos
        const loginData = {
            cpf: $scope.login.cpf,
            code: code
        };

        LoginService.loginUser(loginData).then(function(response) {
            if (response.status === 200) {
                let userCode = prompt("Digite o código enviado ao seu Telegram:");
                if (userCode == code) {
                    window.location.href = 'userdata.html';
                } else {
                    alert("Código incorreto. Tente novamente.");
                }
            } else {
                alert("Erro ao efetuar login.");
            }
        }).catch(function(error) {
            console.error("Erro:", error);
            alert("Erro ao conectar com o servidor.");
        });
    };
}]);
