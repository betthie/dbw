/**
 * Created by Willi on 21.06.2017.
 */


const configValues = require('./config');

module.exports = {

    getDbConnectionString: function() {
        return 'mongodb://'+ configValues.username + ':' +
            configValues.password + '@ds133932.mlab.com:33932/dbw_project'
    },


    /*
    *   @author - willi.linke
    *   @dreturns {string}
    *   @description creates url strings for TankerkoenigAPI
    *   @todo sortierung und kraftstoff einbauen mit path.join
    */
    getStationsQueryUrl: function(params) {
        const API_key = configValues.tankerkoenig.API_key;
        return configValues.tankerkoenig.getStationsUrl + 'lat=' + params.lat + '&lng=' + params.long +
                '&rad=' + params.rad + '&sort=' + params.sort + '&type=' + params.type + '&apikey=' + API_key
    },

    getPricesQueryUrl: function(stationId) {
        const API_key = configValues.tankerkoenig.API_key;
        return configValues.tankerkoenig.getPricesUrl + 'ids=' + stationId + '&apikey=' + API_key
    },

    getStationDetailsQueryUrl: function(params) {
        const API_key = configValues.tankerkoenig.API_key;
        //  params either one station or an id
        let query = 'id=';
        params.id ? query += params.id : query += params;

        return configValues.tankerkoenig.getStationDetailsUrl + query + '&apikey=' + API_key
    }
};
