angular.module("miApp")
    .controller("loginCtrl", function($http, $timeout, $window, $state, store) {
        
    const vm= this;
        
    vm.invalidLogin= false;
    vm.isLoading= false;

    vm.autenticar= function() {

        vm.invalidLogin= false;
        vm.isLoading= true;

        $timeout( function(){

            $http.post("/rest/checkLogin", {"login": vm.login, "password": vm.password}).then(
                function(response) {
                    if(response.data.error == 0 && response.data.result.validLogin) {
                        store.set("login", vm.login);
                        store.set("token", response.data.result.token);
                        $state.transitionTo('list');
                    }
                    else {
                        vm.invalidLogin= true;
                        vm.isLoading= false;
                    }

                    exit();
                },
                function(response) {
                    console.log("ERROR");
                    console.log(response.data);
                    exit();
                }
            );
        }, 1000 );
    };

    function exit() {
        console.log("EXIT");
    }

})