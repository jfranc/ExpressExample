angular.module("miApp")
    .controller("loginCtrl", function($http, $timeout, $window, $state) {
        
    const vm= this;
        
    vm.invalidLogin= false;
    vm.isLoading= false;

    vm.autenticar= function() {

        vm.invalidLogin= false;
        vm.isLoading= true;

        $timeout( function(){

            $http.post("/rest/checkLogin", {"login": vm.login, "password": vm.password}).then(
                function(response) {
                    if(response.data.validLogin) {
                        $state.transitionTo('list');
                    }
                    else {
                        vm.invalidLogin= true;
                        vm.isLoading= false;
                    }

                    exit();
                },
                function(request) {
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