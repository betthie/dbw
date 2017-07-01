/**
 * Created by Willi on 21.06.2017.
 */


const configValues = require('./config');

module.exports = {

    getDbConnectionString: function() {
        return 'mongodb://'+ configValues.username + ':' +
            configValues.password + '@ds133932.mlab.com:33932/dbw_project'
    },

    getTankerkoenigAPIkey: function() {
        return configValues.tankerkoenig.API_key
    },

    /*
    *   @author - willi.linke
    *   @dreturns {string}
    *   @description creates url string for gas stations query
    *   @todo sortierung und kraftstoff einbauen mit path.join
    */
    getStationsQueryUrl: function(params) {
        return configValues.tankerkoenig.getStationsUrl + 'lat=' + params.latitude + '&lng=' + params.longitude +
                '&rad=' + params.radius + '&sort=' + params.sort + '&type=' + params.type + '&apikey=' + params.API_key
    },

    getGoogleAPIkey: function() {
        return configValues.google.API_key
    }
};
