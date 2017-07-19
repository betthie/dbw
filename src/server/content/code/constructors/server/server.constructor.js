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
        getStations: getStations,
        getPriceTrend: getPriceTrend,
        doSnapshot: doSnapshot
    };

    /**
     * Ruft Server für stationen auf
     *   @param {object} request mit parametern für Tankstellen-Suche
     *      .latitude
     *      .longitude
     *      .radius
     *      .sort
     *      .type
     */
    function getStations(request) {

        const latitude = request.location.latitude;
        const longitude = request.location.longitude;
        const radius = request.radius;
        const type = request.type;
        const sort = request.sort;

        return $q.resolve($http.get('/services/getStations/?lat=' + latitude + '&long=' + longitude + '&rad=' +
            radius + '&type=' + type + '&sort=' + sort).then(function (res) {
           return res
        }));
    }


    /**
     * Ruft Server für snapshot auf
     *   @param {array} of stations
     *
     */
    function doSnapshot(request) {
        if(request.length) {
            let data = {};
            data['doSnapshot'] = request;
            return $q.resolve($http.post('/services/doSnapshot', data));
        }
    }


    function getPriceTrend(stationId) {
        return $q.resolve($http.get('/services/getPriceTrend').then(function(res) {
            return res
        }))
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
