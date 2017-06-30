/*
*   @author - willi.linke
*   @description - app.js sets up config and routing for the templates of the application
*
*/


(function() {
    
    'use strict';

    let application = angular.module('application', [ 'ui.router', 'uiGmapgoogle-maps']);

    application.config(function($stateProvider,uiGmapGoogleMapApiProvider){

        $stateProvider
            .state('root', {
                url: '/',
                component: 'root'
            })

        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyCbEhNnFhkwWoFFeAZUrwzVDf7TcWk4coI',
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });
    });

}());

    