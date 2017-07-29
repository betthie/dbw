/**
 * Created by Willi on 02.07.2017.
 */


/**
 * Created by Willi on 21.06.2017.
 * @description - implements service to return station details of a given gas station
 */


(function () {
    'use strict';

    const https = require('https');
    const Config = require('../config');

    module.exports = {
        getHttpMethod: function () {
            return 'GET'
        },
        getParameters: function () {
            return []
        },

        /*  @description - returns price trend of a given gas station
         *  @param {object} request
         *      .stationId
         */
        execute: function (request, callback) {
            //  send request to TankerkoenigAPI for prices of given stationId
            const url = Config.getStationDetailsQueryUrl(request.id);
            https.get(url, function (response) {
                let data = [];
                response.on('data', function (chunk) {
                    data.push(chunk);
                });
                response.on('end', function () {
                    let result;
                    try {
                        //  send data to frontend here
                        result = JSON.parse(data.join(''));
                        callback(
                            null,
                            result
                        )
                    } catch (err) {
                        // throw "request limit exceeded"
                        console.log('request limit exceeded');
                    }
                });
            });


        }
    }

}());

