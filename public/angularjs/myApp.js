const app= angular.module("miApp", ["ui.router"]);

app.config(function($stateProvider, $locationProvider) {

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
        name: "list",
        url: "/list",
        templateUrl: "/views/list"
    });

    $stateProvider.state({
        name: "register",
        url: "/register",
        templateUrl: "/views/register"
    });

    $locationProvider.html5Mode(true);
});




