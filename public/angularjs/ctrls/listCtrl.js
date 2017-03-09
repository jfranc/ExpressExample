angular.module("miApp")
    .controller("listCtrl", function($http, $timeout, $state, store) {

        var vm= this;

        vm.loading= true;
        vm.errorAuth= false;

    function actualizarListaUsuarios() {

        const token= store.get(("token"));
        if(token && token != "undefined")
        {
            vm.loading= true;

            $timeout( function(){
                $http.post('/rest/listUsuarios', {token: token}).then(
                    function(response) {
                        if(response.data.error == 0) {
                            vm.usersList = response.data.result.usersList ? response.data.result.usersList : [];
                            vm.loading= false;
                        }
                        else {
                            $state.transitionTo('login');
                        }
                    },
                    function(response) {
                        console.log('Error: ' + response.data.code + " - " + response.data.description + " - " + response.data.stack );
                        $state.transitionTo('login');
                    }
                );
            }, 1000 );
        }
        else {
            $state.transitionTo('login');
        }

    };

    vm.actualizarListaUsuarios= actualizarListaUsuarios;

    actualizarListaUsuarios();
});