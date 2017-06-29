/*
*   @author - willi.linke
*   @description - app.js sets up config and routing for the templates of the application
*
*/


(function() {
    
    'use strict';

    const application = angular.module('application', ['ui.router']);

    application.config(function($stateProvider){

        $stateProvider
            .state('root', {
                url: '/',
                component: 'root'
            })


    });


}());

    