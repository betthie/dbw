/**
 * Created by Willi on 30.06.2017.
 */


(function() {
    'use strict';

    const https = require('https');
    const async = require('async');
    const Config = require('../config');
    const Stations = require('../models/snapshot.model');
    const getStationDetailsService = require('./getStationDetails.service');


    module.exports = {
        httpMethod: function() {
            return 'GET'
        },
        /*  holt Tankstellen von TankerkoenigAPI
         *  @param {object} request
         *       .location
         *       .radius
         *       .sort
         *       .type
         */
        execute: function(request, callback) {
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
                    let result = JSON.parse(stations);
                    let serverResponse = [];
                    let tasks = [];
                    // get this done by getStationDetails.service
                    for (let i = 0; i < result.stations.length; i++) {
                        let station = result.stations[i];
                        //  uses service to get StationDetails
                        let task =  function(callback) {
                            getStationDetailsService.execute(station, function(err, res) {
                                serverResponse.push(res.station);
                                callback();
                            });
                        };
                        tasks.push(task);
                    }
                    //  wait until all promises are finished
                    async.parallel(tasks, function(err) {
                        if (err) throw err;
                        callback(
                            null,
                            serverResponse
                        )
                    })
                });
            });


        }
    }

}());
