/*
*
*
*/


application.factory('Server', Server);

Server.$inject = ['$http', '$q', '$location'];

// Service um Aktionen auf dem Server auszuführen
function Server($http, $q, $location) {
    const that = this;
    const rootUrl = $location.host() + ($location.port() !== 8080 ? ':' + $location.port() : '');
    this.repository = getRepository().then(function(rep) {
        that.repository = rep.data
    });


    return {
        // führt einen oder mehrere Requests auf dem Server aus und gibt deren Ergebnis zurück
        execute: execute
    };

    // Requests auf dem Server ausführen (JSON/HTTP)
    // Methoden GET und Post dynamisch verwenden
    function execute(requests) {

        /*
        * send one or multiple requests
        *
        * */
        if(that.repository[requests]) {
            return $http(
                {
                    url: '/',
                    method: 'POST',
                    data: requests
                });
        } else {
            console.log('Service not defined')
        }

    }

    function getRepository() {
        return $q.resolve(
            $http(
                {
                    url: '/repository',
                    method: 'GET',
                }));
    }
}
