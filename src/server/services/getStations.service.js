/**
 * Created by Willi on 30.06.2017.
 */


(function() {
    'use strict';

    const https = require('https');
    const Stations = require('../models/snapshot.model');
    const Config = require('../config');

    module.exports = {

        /*  holt Tankstationen von TankerkoenigApi
         *  @param {object} request
         *       .location
         *       .radius
         *
         */
        execute: function(request, callback) {
            //  Parameter für request an tankerkönig api
            let params = {};
            params.latitude = request.location.latitude;
            params.longitude = request.location.longitude;
            params.radius = request.radius;
            params.API_key = Config.getTankerkoenigAPIkey();
            params.sort = request.sort;
            params.type = request.type;

            //  Erzeugen der URL
            const url = Config.getStationsQueryUrl(params);

            //  Get request an TankerAPI
           https.get(url, function(response) {
                let data = [];
                response.on('data', function(chunk) {
                    data.push(chunk);
                });
                response.on('end', function() {
                    let result = JSON.parse(data.join(''));
                    //  send data to frontend here
                    callback(
                        null,   // possible error
                        result  
                    )
                });
            });


        }
    }

}());