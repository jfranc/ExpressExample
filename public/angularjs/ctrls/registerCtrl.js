
angular.module("miApp")
    .controller("registerCtrl", function($http, $timeout, $window, $state) {

    const vm= this;

    vm.isLoading= false;
    vm.invalidForm= false;
    vm.invalidLogin= false;

    vm.register= function() {

        if(vm.name && vm.login && vm.password) {

            vm.isLoading= true;
            vm.invalidForm= false;
            vm.invalidLogin= false;

            $timeout( function(){
                $http.post("/rest/register", {"name": vm.name, "login": vm.login, "password": vm.password }).then(
                    function(response) {
                        if(response.data.validUser) {
                            $state.transitionTo('list');
                        } else {
                            vm.invalidLogin= true;
                            vm.isLoading= false;
                        }

                        exit();

                    },
                    function(request) {
                        vm.isLoading= false;
                        exit();
                    }
                );
            }, 1000 );
        }
        else {
            vm.invalidForm= true;
            vm.isLoading= false;
            vm.invalidLogin= false;
        }

    };

    function exit() {
    }

});