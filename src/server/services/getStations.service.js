/**
 * Created by Willi on 30.06.2017.
 */


(function () {
    'use strict';

    const https = require('https');
    const async = require('async');
    const Config = require('../config');
    const Stations = require('../models/snapshot.model.js');
    const getStationDetails = require('./getStationDetails.service');


    module.exports = {
        getHttpMethod: function () {
            return 'GET'
        },
        getParameters: function () {
            return ['latitude', 'longitude', 'radius', 'sort', 'type']
        },
        /*  holt Tankstellen von TankerkoenigAPI
         *  @param {object} request
         *       .latitude
         *       .longitude
         *       .radius
         *       .sort
         *       .type
         */
        execute: function (request, callback) {
            //  Erzeugen der URL
            let url = Config.getStationsQueryUrl(request);

            //  Get request an TankerAPI
            https.get(url, function (response) {
                let stations = [];
                response.on('data', function (chunk) {
                    stations.push(chunk);
                });
                //  use async to load details of all stations
                response.on('end', function () {
                    let result;
                    try {
                        result = JSON.parse(stations);

                    } catch (err) {
                        // throw "request limit exceeded"
                        console.log('request limit exceeded')
                    }

                    let response = [];
                    let tasks = [];
                    // get this done by getStationDetails.service
                    for (let i = 0; i < result.stations.length; i++) {
                        let station = result.stations[i];
                        //  uses service to get StationDetails
                        let task = function (callback) {
                            getStationDetails.execute(station, function (err, res) {
                                response.push(res.station);
                                callback();
                            });
                        };
                        tasks.push(task);
                    }
                    //  wait until all promises are finished
                    async.parallel(tasks, function (err) {
                        if (err) throw err;
                        callback(
                            null,
                            response
                        )
                    })
                });
            });


        }
    }

}());
