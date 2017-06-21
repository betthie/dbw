/**
 * Created by Willi on 21.06.2017.
 */


const configValues = require('./config');

module.exports = {

    getDbConnectionString: function() {
        return 'mongodb://'+ configValues.username + ':' +
            configValues.password + '@ds133932.mlab.com:33932/dbw_project'
    }
};
