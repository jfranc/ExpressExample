angular.module("miApp").run(function($rootScope, $state, store, jwtHelper) {
    $rootScope.$on('$stateChangeStart', function(event, toState) {
        if(toState.data && toState.data.requireLogin) { // Se necesita token
            const token= store.get("token");

            if(!token || jwtHelper.isTokenExpired(token)) {
                event.preventDefault();
                console.log("vamos a home!");
                $state.go("home");
            }
        }
    });
});