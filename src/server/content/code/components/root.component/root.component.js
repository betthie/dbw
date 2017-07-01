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


        $ctrl.map = {
            centre:   {
                latitude: 44.2126995,
                longitude: -100.2471641
            },
            zoom: 3 ,
            options : {
                scrollwheel: false
            }
        };


        uiGmapGoogleMapApi.then(function(maps) {
            console.log('Maps loaded')
        });

        $ctrl.getStations = function() {
            Server.execute({'getStations' : {
                location: {
                    latitude: 52.520008,
                    longitude: 13.404954
                },
                radius: 1.5,
                type: 'all',
                sort: 'dist'
            }}).then(function(stations) {
                console.log(stations.data)
            })
        }

    }
}());

