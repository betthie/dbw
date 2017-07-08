/**
 * Created by Willi on 21.06.2017.
 */


(function() {
    'use strict';

    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    const stationSchema = new Schema({
        _id: String,
        name: String,
        brand: String,
        street: String,
        houseNumber: String,
        place: String,
        location: Object,
    });

    // separate database logic from controller


    stationSchema.statics.createStation = function (station) {
        let newStation = new this(); // <- Fetch  model "on the fly"
        newStation._id = station.id;
        newStation.name = station.name;
        newStation.brand = station.brand;
        newStation.street = station.street;
        newStation.houseNumber = station.houseNumber;
        newStation.place = station.place;
        newStation.location = station.location;
        return newStation;
    };


    // save station
    stationSchema.statics.saveStation = function(station, callback){
        console.log(station);
        let query = {_id: station.id};
        let update = {
            _id: station._id,
            name: station.name,
            brand: station.brand,
            street: station.street,
            place: station.place,
            houseNumber: station.houseNumber,
            location: station.location,
        };
        let options = {upsert: true, new: true, setDefaultsOnInsert: true};
        return this.model('Stations').findOneAndUpdate(query, update, options, callback)
    };


    stationSchema.methods.update = function (callback) {

    };

    stationSchema.methods.delete = function (callback) {

    };

    let Stations = mongoose.model('Stations', stationSchema);
    module.exports = Stations;

}());