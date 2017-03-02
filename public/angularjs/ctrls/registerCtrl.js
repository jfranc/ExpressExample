
angular.module("miApp")
    .controller("registerCtrl", function($scope, $http, $timeout, $window) {

    $scope.loading= false;
    $scope.invalidForm= false;
    $scope.invalidLogin= false;

    $scope.register= function() {

        if($scope.name && $scope.login && $scope.password) {

            $scope.loading= true;
            $scope.invalidForm= false
            $scope.invalidLogin= false;

            $timeout( function(){
                $http.post("/register", {"name": $scope.name, "login": $scope.login, "password": $scope.password }).then(
                    function(response) {
                        if(response.data.validUser) {
                            $window.location.href = '/list';
                        } else {
                            $scope.invalidLogin= true;
                            $scope.loading= false;
                        }

                        exit();

                    },
                    function(request) {
                        $scope.loading= false;
                        exit();
                    }
                );
            }, 1000 );
        }
        else {
            $scope.invalidForm= true;
            $scope.loading= false;
            $scope.invalidLogin= false;
        }

    }

    function exit() {
    }

});