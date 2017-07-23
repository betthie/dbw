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
        openingTimes: Array,
        isOpen: Boolean
    });

    // separate database logic from controller


    stationSchema.statics.create = function (station) {
        let newStation = new this(); // <- fetch  model
        newStation._id = station.id;
        newStation.name = station.name;
        newStation.brand = station.brand;
        newStation.street = station.street;
        newStation.houseNumber = station.houseNumber;
        newStation.place = station.place;
        newStation.location = station.location;
        newStation.openingTimes = station.openingTimes;
        newStation.isOpen = station.isOpen;
        return newStation;
    };


    // save station
    stationSchema.statics.save = function(station, callback){
        let query = {_id: station._id};
        let update = {
            _id: station._id,
            name: station.name,
            brand: station.brand,
            street: station.street,
            place: station.place,
            houseNumber: station.houseNumber,
            location: station.location,
            openingTimes: station.openingTimes,
            isOpen: station.isOpen
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