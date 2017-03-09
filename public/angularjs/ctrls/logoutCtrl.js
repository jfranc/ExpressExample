angular.module("miApp")
    .controller("logoutCtrl", function($state) {

        const vm= this;

        sessionStorage.removeItem("login");
        sessionStorage.removeItem("token");

        $state.transitionTo('home');

    });
