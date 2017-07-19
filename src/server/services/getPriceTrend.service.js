/**
 * Created by Willi on 21.06.2017.
 * @description - implements service to return price trend of a given gas station
 */


(function() {
    'use strict';

    const https = require('https');
    const Config = require('../config');
    const Snapshots = require('../models/snapshot.model');

    module.exports = {
        getHttpMethod: function() {
            return 'GET'
        },
        getParameters: function() {
            return []
        },
        /*  @description - returns price trend of a given gas station
         *  @param {object} request
         *      .stationId
         *
         */
        execute: function (request, callback) {
            console.log(request);
            //  pulls all prices from db
            let prices = Snapshots.get({ stationId: request.stationId}, function(err, prices) {
                console.log(prices);
                return prices
            });


            /*
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

