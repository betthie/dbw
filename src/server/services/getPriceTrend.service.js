/**
 * Created by Willi on 21.06.2017.
 * @description - implements service to return price trend of a given gas station
 */


(function() {
    'use strict';

    const https = require('https');
    const Config = require('../config');

    module.exports = {
        httpMethod: function() {
            return 'GET'
        },

        /*  @description - returns price trend of a given gas station
         *  @param {object} request
         *      .stationId
         *
         */
        execute: function (request, callback) {
            //  send request to TankerkoenigAPI for prices of given stationId
            /*
            const url = Config.getPricesQueryUrl(request.stationId);


            https.get(url, function(response) {
                let data = [];
                response.on('data', function(chunk) {
                    data.push(chunk);
                });
                response.on('end', function() {
                    let result = JSON.parse(data.join(''));
                    //  send data to frontend here
                    callback(
                        null,
                        result
                    )
                });
            });

            */

        }
    }

}());

