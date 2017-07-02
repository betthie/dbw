/**
 * Created by Willi on 30.06.2017.
 */


(function() {
    'use strict';

    const https = require('https');
    const async = require('async');
    const Config = require('../config');
    const Stations = require('../models/snapshot.model');


    module.exports = {

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
                    for (let i = 0; i < result.stations.length; i++) {
                        let station = result.stations[i];
                        let task = function(callback) {
                            console.log(Config.getStationDetailsQueryUrl(station));
                            https.get(Config.getStationDetailsQueryUrl(station), function(res) {
                                let data = [];
                                res.on('data', function(chunk) {
                                    data.push(chunk);
                                });
                                res.on('end', function() {
                                    let details = JSON.parse(data);
                                    serverResponse.push(details.station);
                                    callback();
                                })
                            });
                        };
                        tasks.push(task);
                    }

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
