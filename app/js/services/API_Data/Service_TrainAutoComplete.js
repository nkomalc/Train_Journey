/**
 * Created by komal.chaudhary on 2/19/2016.
 */

//Factory For Get Autocomplete JSON
/*
 * Service_TrainAutoComplete
 * Inject : $http & Ket_Train_API which contain kEy
 * return  function getObjectJSON(train_name_no) {}
 * accept train No. or name and return JSON Object
 */


angular.module("myApp").factory('Service_TrainAutoComplete', function ($http, Key_Train_API) {


    return function getObjectJSON(train_name_no)
    {
        var key = Key_Train_API();
        var url = "http://api.railwayapi.com/suggest_train/trains/" + train_name_no + "/apikey/" + key + "/";
        //console.log(url);
        url = "json/AllTrains.json";
        return $http.get(url);
    }
});


//C:\Users\komal.chaudhary\WebstormProjects\Train_Journey\app\json\AllTrains.json