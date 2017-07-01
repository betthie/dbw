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
            params.latitude = request.location.lat;
            params.longitude = request.location.lng;
            params.radius = request.radius;
            params.API_key = Config.getTankerkoenigAPIkey();
            params.sort = request.sort;
            params.type = request.type;

            //  Erzeugen der URL
            const url = Config.getStationsQueryUrl(params);
            console.log(url);
            https.get(url, function(response) {
                //console.log(response)
            });

            callback(
                null,
                //parse data to send to frontend here
                null
            )
        }
    }

}());