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
    this.repository = getRepository();


    return {
        // führt einen oder mehrere Requests auf dem Server aus und gibt deren Ergebnis zurück
        getStations: getStations
    };

    // Requests auf dem Server ausführen (JSON/HTTP)
    // Methoden GET und Post dynamisch verwenden
    function getStations(request) {

        /*
         * send requests
         *
         */
        let latitude = request.location.latitude;
        let longitude = request.location.longitude;
        let radius = request.radius;
        let type = request.type;
        let sort = request.sort;


        return $q.resolve($http.get('/services/getStations/?lat=' + latitude + '&long=' + longitude + '&rad=' +
            radius + '&type=' + type + '&sort=' + sort).then(function (res) {
           return res
        }));
    }

    function getRepository() {
        return $q.resolve(
            $http(
                {
                    url: '/repository',
                    method: 'GET',
                }).then(function(repo) {
                    console.log(repo.data);
                    that.repository = repo.data;
            }));
    }
}
