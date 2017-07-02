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
        $ctrl.selectedStation = {};

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
                click: function(map, eventName, eventArgs) {
                    //  get location of click event
                    let e = eventArgs[0];
                    let location = {
                        latitude: e.latLng.lat(),
                        longitude: e.latLng.lng()
                    };
                    //  request stations from server
                    Server.execute({
                        'getStations': {
                            location: location,
                            radius: 1.5,
                            type: 'all',
                            sort: 'dist'
                        }
                    }).then(function (response) {
                        $ctrl.stations = [];
                        console.log(response)
                        //  transform response.data into valid format for maps directive
                        for (let i = 0; i < response.data.length; i++) {
                            let station = response.data[i];
                            station.location = {};
                            station.location.latitude = station.lat;
                            station.location.longitude = station.lng;
                            $ctrl.stations.push(station);
                        }
                    })
                }
            },
            markerEvents: {
                click: function(marker, eventName, model) {
                    //  fills details of station.directive with information of clicked model
                    $ctrl.selectedStation = model;
                }
            }
        };
    }
}());

