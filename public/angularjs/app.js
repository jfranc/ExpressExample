const app= angular.module("miApp", ["ui.router"]);

app.config(function($stateProvider, $locationProvider) {
    $stateProvider.state({
        name: "registro",
        url: "/registro",
        templateUrl: "/registro"
    });

    $locationProvider.html5Mode(true);
});




