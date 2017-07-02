/**
 * Created by Willi on 02.07.2017.
 */


/**
 * Created by Willi on 21.06.2017.
 * @description - implements service to return station details of a given gas station
 */


(function() {
    'use strict';

    const https = require('https');
    const Config = require('../config');

    module.exports = {

        /*  @description - returns price trend of a given gas station
         *  @param {object} request
         *      .stationId || [array of stationIds]
         *
         */
        execute: function (request, callback) {
            //  send request to TankerkoenigAPI for prices of given stationId

            const url = Config.getStationDetailsQueryUrl(request.id);

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


        }
    }

}());

