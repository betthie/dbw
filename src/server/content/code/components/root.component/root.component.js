/**
 * Created by willi.linke on 30.06.2017
 * */

(function() {
    "use strict";

    angular.module('application')
        .component('root', {
            templateUrl: 'code/components/root.component/root.template.html',
            controller: RootCtrl,
            bindings: {

            }

        });


    RootCtrl.$inject = [ '$scope', 'uiGmapGoogleMapApi', 'Server'];

    function RootCtrl($scope, uiGmapGoogleMapApi, Server) {
        "use strict";
        let $ctrl = this;
        $ctrl.stations = [];

        //  initial map
        $ctrl.map = {
            centre:   {
                latitude: 52.520008,
                longitude: 13.404954
            },
            zoom: 10 ,
            options : {
                scrollwheel: false
            },
            events: {
                click: function(map, eventName, originalEventArgs) {
                    //  get location of click event
                    let e = originalEventArgs[0];
                    let location = {
                        latitude: e.latLng.lat(),
                        longitude: e.latLng.lng()
                    };
                    $ctrl.getStations(location)

                }
            }
        };


        uiGmapGoogleMapApi.then(function(maps) {

        });

        $ctrl.getStations = function(location) {
            Server.execute({'getStations' : {
                location: {
                    latitude: location.latitude,
                    longitude: location.longitude
                },
                radius: 1.5,
                type: 'all',
                sort: 'dist'
            }}).then(function(response) {
                $ctrl.stations = [];
                //  transform response.data for maps directive
                for(let i= 0; i< response.data.stations.length; i++) {
                    let station = response.data.stations[i];
                    station.location = {};
                    station.location.latitude = station.lat;
                    station.location.longitude = station.lng;
                    $ctrl.stations.push(station);
                }
            })
        }

    }
}());

