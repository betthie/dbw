/*
*
*
*/


application.factory('Server', Server);

Server.$inject = ['$http', '$q', '$location'];

// Service um Aktionen auf dem Server auszuführen
function Server($http, $q, $location) {
    const rootUrl = $location.host() + ($location.port() !== 8080 ? ':' + $location.port() : '');

    return {
        // führt einen oder mehrere Requests auf dem Server aus und gibt deren Ergebnis zurück
        execute: execute
    };

    // Requests auf dem Server ausführen (JSON/HTTP)
    function execute(requests) {
        return $http(
            {
                url: 'http://' + rootUrl + '/',
                method: 'POST',
                data: requests
            });
    }
}
