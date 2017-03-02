
angular.module("miApp")
    .controller("loginCtrl", function($scope, $http, $timeout, $window) {

    $scope.invalidLogin= false;
    $scope.isLoging= false;

    $scope.autenticar= function() {

        $scope.invalidLogin= false;
        $scope.isLoging= true;

        $timeout( function(){

            $http.post("/checkLogin", {"login": $scope.login, "password": $scope.password}).then(
                function(response) {
                    if(response.data.validLogin) {
                        $window.location.href = '/list';
                    }
                    else {
                        $scope.invalidLogin= true;
                        $scope.isLoging= false;
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