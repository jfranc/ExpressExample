angular.module("miApp").config(function($stateProvider, $locationProvider, jwtInterceptorProvider, $httpProvider) {

    jwtInterceptorProvider.tokenGetter = function(store) {
        return store.get("token");
    };

    $httpProvider.interceptors.push("jwtInterceptor");

    $stateProvider.state("dummy", {
        data: {
            requireLogin : true
        }
    });

    $stateProvider.state({
        name: "home",
        url: "/",
        templateUrl: "/views/login"
    });

    $stateProvider.state({
        name: "login",
        url: "/login",
        templateUrl: "/views/login"
    });

    $stateProvider.state({
        name: "logout",
        url: "/logout",
        templateUrl: "/views/logout"
    });

    $stateProvider.state({
        name: "list",
        url: "/list",
        templateUrl: "/views/list",
        data: {
            requireLogin : true
        }
    });

    $stateProvider.state({
        name: "register",
        url: "/register",
        templateUrl: "/views/register"
    });

    $locationProvider.html5Mode(true);
});




