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


    RootCtrl.$inject = [ '$scope', 'uiGmapGoogleMapApi'];

    function RootCtrl($scope, uiGmapGoogleMapApi) {
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


    }
}());

