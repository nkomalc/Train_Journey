/**
 * Created by komal.chaudhary on 2/22/2016.
 */
//Service_Train_Fare_Enquiry



angular.module("myApp").factory('Service_Train_Fare_Enquiry', function ($http, Key_Train_API) {


    return function getObjectJSON(train_name_no, source_code, dest_code, age, doj, quota_code)
    {
        var key = Key_Train_API();
        var url = "http://api.railwayapi.com/fare/train/" + train_name_no + "/source/" + source_code +
            "/dest/" + dest_code + "/age/" + age +
            "/quota/" + quota_code + "/doj/" + doj +
            "/apikey/" + key +  "/";

        console.log(url);
        return $http.get(url);
    }
});
