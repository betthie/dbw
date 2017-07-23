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
            //  pulls all prices from db
            Snapshots.get({ stationId: request.stationId}, function(err, prices) {
                if (err) throw err;
                let trend = {};
                trend.e10 = [];
                trend.e5 = [];
                trend.diesel = [];
                trend.dates = [];

                prices.map(function(price) {
                    trend.e10.push(price.e10);
                    trend.e5.push(price.e5);
                    trend.diesel.push(price.diesel);
                    trend.dates.push(price.date)
                });

                callback (
                    err,
                    trend
                )
            });



        }
    }

}());

