/*
 *   @author - willi.linke
 *   @description - app.js sets up config and routing for the templates of the application
 *
 */

'use strict';

let application = angular.module('application', ['chart.js', 'ui.router', 'uiGmapgoogle-maps']);

application.config(function ($stateProvider, uiGmapGoogleMapApiProvider) {

    $stateProvider
        .state('root', {
            url: '/',
            component: 'root'
        });

    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyCbEhNnFhkwWoFFeAZUrwzVDf7TcWk4coI',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
});

application.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
        chartColors: ['#c400bb', '#00c999'],
        responsive: false
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
        showLines: false
    });
}]);








    