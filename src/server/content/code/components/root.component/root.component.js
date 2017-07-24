/**
 * Created by willi.linke on 30.06.2017
 * */

(function () {
    "use strict";

    angular.module('application')
        .component('root', {
            templateUrl: 'code/components/root.component/root.template.html',
            controller: RootCtrl,
            bindings: {}

        });


    RootCtrl.$inject = ['$scope', 'uiGmapGoogleMapApi', 'Server'];

    function RootCtrl($scope, uiGmapGoogleMapApi, Server) {
        "use strict";
        let $ctrl = this;
        $ctrl.stations = [];
        $ctrl.selectedStation = {};
        $ctrl.radius = 1.5;


        //  config for price chart
        $ctrl.data = [];
        $ctrl.labels = [];
        $ctrl.series = ['E5', 'E10', 'Diesel'];
        $ctrl.onClick = function (points, evt) {
            console.log(points, evt);
        };
        $ctrl.datasetOverride = [{yAxisID: 'y-axis-1'}];
        $ctrl.options = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    }
                ]
            }
        };

        //  initial map
        $ctrl.map = {
            centre: {
                latitude: 52.520008,
                longitude: 13.404954
            },
            zoom: 10,
            options: {
                scrollwheel: false
            },
            events: {
                click: function (map, eventName, eventArgs) {
                    //  get location of click event
                    let e = eventArgs[0];
                    let location = {
                        latitude: e.latLng.lat(),
                        longitude: e.latLng.lng()
                    };
                    //  request stations from server
                    /*
                    Server.getStations({
                        location: location,
                        radius: $ctrl.radius,
                        type: 'all',
                        sort: 'dist'
                    })
                    */
                    Server.execute.getStations({
                        lat: location.latitude,
                        long: location.longitude,
                        rad: $ctrl.radius,
                        type: 'all',
                        sort: 'dist'
                    }).then(function (response) {

                        $ctrl.stations = [];
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
                click: function (marker, eventName, model) {
                    //  fills details of station.directive with information of clicked model
                    $ctrl.selectedStation = model;
                    Server.execute.getPriceTrend({ stationId: model.id }).then(function(res) {
                        //  transform dates into labels
                        $ctrl.labels = res.data.dates.map(function(date) {
                            let newDate = new Date(Date.parse(date));
                            return newDate.getDate() + '.' + (newDate.getMonth() +1) + '.' + newDate.getFullYear()
                        });
                        $ctrl.data.push(res.data.e5, res.data.e10, res.data.diesel);
                    });
                }
            }
        };

        $ctrl.doSnapshot = function (stations) {
            console.log(stations);
            Server.doSnapshot(stations, function () {

            }).then(function() {
                //  update price trends for markers
                Server.execute.getPriceTrend({ stationId: $ctrl.selectedStation.id }).then(function(res) {
                    //  transform dates into labels
                    $ctrl.labels = res.data.dates.map(function(date) {
                        let newDate = new Date(Date.parse(date));
                        return newDate.getDate() + '.' + (newDate.getMonth() +1) + '.' + newDate.getFullYear()
                    });
                    $ctrl.data.push(res.data.e5, res.data.e10, res.data.diesel);
                });
            })
        };

    }
}());

