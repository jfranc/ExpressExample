const app = angular.module("miApp", []);
app.controller("listCtrl", function($scope, $http, $timeout) {

    $scope.loading= true;

    function actualizarListaUsuarios() {
        $scope.loading= true;

        $timeout( function(){
            $http.get('/listUsuarios').then(
                function(response) {
                    $scope.usersList = response.data.usersList ? response.data.usersList : [];
                    $scope.loading= false;
                },
                function(request) {
                    console.log('Error: ' + response.data);
                }
            );
        }, 1000 );
    };

    $scope.actualizarListaUsuarios= actualizarListaUsuarios;

    actualizarListaUsuarios();
});