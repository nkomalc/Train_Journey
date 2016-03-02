/**
 * Created by komal.chaudhary on 2/19/2016.
 */

/*
 * Key_GMap_API Factory
 * Return Google Map Key
 */

angular.module("myApp").factory('Key_GMap_API', function () {


    return function getKey()
    {
        var key = "AIzaSyCaf8BO6vvAgj818NmIeZD8yabWCwZ3TBY";
        return key;
    }
});