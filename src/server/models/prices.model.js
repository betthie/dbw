/**
 * Created by Willi on 21.06.2017.
 */


(function() {
   'use strict';

    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    const priceSchema = new Schema({
        _id: Number,
        date: Date,
        diesel: Number,
        e5: Number,
        e10: Number
    });

    // implementing database logic to separate it from controller
    priceSchema.statics.create = function(callback){
        return this.model('Records').find({}, callback)
    };

    priceSchema.statics.update = function (callback) {

    };

    priceSchema.statics.delete = function (callback) {

    };

    let Prices = mongoose.model('Prices', priceSchema);
    module.exports = Prices;

}());


