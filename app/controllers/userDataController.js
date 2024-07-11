app.controller('UserDataController', ['$scope', 'UserDataService', function($scope, UserDataService) {
    $scope.user = {};
    $scope.subscriptionStatus = "Carregando...";

    $scope.init = function() {
        var urlParams = new URLSearchParams(window.location.search);
        var cpf = urlParams.get('cpf');

        UserDataService.getUserData(cpf).then(function(response) {
            if (response.status === 200) {
                $scope.user = response.data.user;
                $scope.subscriptionStatus = response.data.subscriptionStatus ? "Ativa" : "Inativa";
            } else {
                alert("Erro ao carregar dados do usuário.");
            }
        }).catch(function(error) {
            console.error("Erro:", error);
            alert("Erro ao conectar com o servidor.");
        });
    };

    $scope.updateUser = function() {
        UserDataService.updateUser($scope.user).then(function(response) {
            if (response.status === 200) {
                alert("Dados atualizados com sucesso!");
            } else {
                alert("Erro ao atualizar dados.");
            }
        }).catch(function(error) {
            console.error("Erro:", error);
            alert("Erro ao conectar com o servidor.");
        });
    };

    $scope.init();
}]);
