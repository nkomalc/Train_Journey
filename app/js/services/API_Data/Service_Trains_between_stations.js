/**
 * Created by komal.chaudhary on 2/22/2016.
 */

//Service_Trains_between_stations
/*
 * @param : Source : Source Station name
 *          Destination : Destination Station name
 *          date : Journey Date in DD-MM Format
 */

angular.module("myApp").factory('Service_Trains_between_stations', function ($http, Key_Train_API) {

    return function getObjectJSON(source, dest, date)
    {
        var key = Key_Train_API();
        var url = "http://api.railwayapi.com/between/source/" + source +
            "/dest/" + dest +
            "/date/" + date + "/apikey/" + key + "/";

        console.log(url);
        return $http.get(url);
    }
});
