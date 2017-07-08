/**
 * Created by Willi on 08.07.2017.
 */
/**
 * Created by Willi on 21.06.2017.
 */


(function() {
    'use strict';

    module.exports = {
        getHttpMethod: function() {
            return 'GET'
        },
        getParameters: function() {
            return []
        },
        /*  creates a snapshot, based on chosen location and radius
         *  @param {object} request
         *       .location
         *       .radius
         *       .date
         */
        execute: function(request, callback) {

            // http request an tankerkönig api
            //
            callback(
                null,
                //parse data to send to frontend here
                null
            )
        }
    }
}());
