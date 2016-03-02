/**
 * Created by komal.chaudhary on 2/19/2016.
 */
angular.module('myApp', ['ngRoute']);

angular.module('myApp').run(function($rootScope) {
    //$rootScope.color = 'blue';
    $rootScope.showGoogleMap = false;
    $rootScope.train_route_loader = false;
    $rootScope.home_page = true;

    $rootScope.btnHome_Click = function(){
        $rootScope.home_page = true;
        //alert("$rootScope.home_page = " + $rootScope.home_page);
    }
});



angular.module("myApp").config(function($routeProvider, $httpProvider ) {
    $routeProvider
        // route for the landing_page
        .when('/landing_page:train_no', {
            templateUrl : 'views/landing_page/landing_page.html',
            controller  : 'Ctrl_landing_page'
        })
        // route for the Google Map
        .when('/google_map',{
            templateUrl : 'views/google_map/google_map.html',
            controller  : 'Ctrl_Google_Map'
        })
        // route for the Train_Between_Stations
        .when('/Train_Between_Stations',{
            templateUrl : 'views/Train_Between_Stations/Train_Between_Stations.html',
            controller  : 'Ctrl_Train_Between_Stations'
        })
        // route for the Seat Availability
        .when('/seat_availability',{
            templateUrl : 'views/seat_availability/seat_availability.html',
            controller  : 'Ctrl_Seat_Availability'
        })
        // route for the Fare Enquiry
        .when('/fare_enquiry',{
            templateUrl : 'views/fare_enquiry/fare_enquiry.html',
            controller  : 'Ctrl_Fare_Enquiry'
        })
        .otherwise({
            redirectTo: '/'
        });

});