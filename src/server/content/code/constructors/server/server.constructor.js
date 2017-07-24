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
    this.execute = {};
    this.repository = getRepository();



    return {
        // führt einen oder mehrere Requests auf dem Server aus und gibt deren Ergebnis zurück
        getStations: getStations,
        getPriceTrend: getPriceTrend,
        doSnapshot: doSnapshot,
        execute: that.execute
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
        return $q.resolve($http.get('/services/getPriceTrend/?stationId=' + stationId).then(function(res) {
            return res
        }))
    }

    function getRepository() {
        return $q.resolve(
            $http(
                {
                    url: '/repository',
                    method: 'GET',
                }).then(function (repo) {
                that.repository = repo.data;
                for (let service in that.repository) {
                    //  parameter via url string oder als objekt mitschicken
                    let urlString = '';
                    if (that.repository[service].method === 'GET') {
                        that.execute[service] = function (request) {
                            //  url string zusammensetzen
                            urlString = '/services/' + service;
                            if (that.repository[service].parameters.length) {
                                urlString += '/?';
                                let parameters = that.repository[service].parameters;
                                for (let i= 0; i< parameters.length; i++) {
                                    i !== 0 ? urlString += '&' : null;
                                    urlString += parameters[i] + '=' + request[parameters[i]];
                                }

                            }
                            console.log(urlString);
                            return $q.resolve($http.get(urlString).then(function (res) {
                                return res
                            }))
                        }

                    } else if (that.repository[service].method === 'POST') {
                        //  parameter via server-request mitschicken
                        that.execute[service] = function (request) {
                            //  url string zusammensetzen
                            urlString = '/services/' + service;
                            return $q.resolve($http.post(urlString, request).then(function (res) {
                                return res
                            }))
                        }
                    }
                }
            }));
    }
}
