/**
 * Created by komal.chaudhary on 2/21/2016.
 */
//Train route information


angular.module("myApp").factory('Service_Train_Route_Information', function ($http, Key_Train_API) {


    return function getObjectJSON(train_name_no)
    {
        var key = Key_Train_API();
        var url = "http://api.railwayapi.com/route/train/" + train_name_no + "/apikey/" + key + "/";
        //var url = "json/Train_route_info.js";
        console.log(url);
        return $http.get(url);
    }
});
