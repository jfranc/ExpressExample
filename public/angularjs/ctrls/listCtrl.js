
angular.module("miApp")
    .controller("listCtrl", function($http, $timeout) {

        var vm= this;

        vm.loading= true;

    function actualizarListaUsuarios() {
        vm.loading= true;

        $timeout( function(){
            $http.get('/rest/listUsuarios').then(
                function(response) {
                    vm.usersList = response.data.usersList ? response.data.usersList : [];
                    vm.loading= false;
                },
                function(request) {
                    console.log('Error: ' + response.data);
                }
            );
        }, 1000 );
    };

    vm.actualizarListaUsuarios= actualizarListaUsuarios;

    actualizarListaUsuarios();
});