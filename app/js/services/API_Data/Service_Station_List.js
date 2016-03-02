/**
 * Created by komal.chaudhary on 2/23/2016.
 */

/*
 * @name : Service_Station_List
 * @desc : used for reading all railway station in json
 */

angular.module("myApp").factory('Service_Station_List', function ($http, Key_Train_API) {


    return function getObjectJSON(name)
    {
        var key = Key_Train_API();
        var url = "json/StationListJSON.json";
        url = "http://api.railwayapi.com/suggest_station/name/" + name + "/apikey/"+ key + "/";
        console.log(url);
        return $http.get(url);
    }
});