/**
 * Created by Willi on 30.06.2017.
 */



application.directive('station', function(){
    return {
        templateUrl: 'code/components/station.directive/station.template.html',
        restrict: 'E',
        replace: false
    }
});