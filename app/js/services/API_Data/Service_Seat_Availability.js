/**
 * Created by komal.chaudhary on 2/21/2016.
 */
//Service_Seat_Availability

/*
 * @name Service_Seat_Availability
 * return :  Function
 * @param : train_name_no, source_code, dest_code, doj, class_code, quota_code
 *      train_name_no :- Train Number
 *      source_code   :-  Source Name / Code
 *      dest_code     :-  Destination Name
 *      doj           :-  Date of Joining
 *      class_code    :-  Seat Class
 *      quota_code    :-  Quota Codes
 */

angular.module("myApp").factory('Service_Seat_Availability', function ($http, Key_Train_API) {


    return function getObjectJSON(train_name_no, source_code, dest_code, doj, class_code, quota_code)
    {
        var key = Key_Train_API();
        var url = "http://api.railwayapi.com/route/train/" + train_name_no + "/apikey/" + key + "/";
        url="http://api.railwayapi.com/check_seat/train/" + train_name_no + "/source/" + source_code +
            "/dest/" + dest_code + "/date/" + doj +
            "/class/" + class_code +
            "/quota/" + quota_code + "/apikey/" + key + "/";
        console.log(url);
        return $http.get(url);
    }
});
