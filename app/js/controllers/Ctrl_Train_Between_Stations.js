/**
 * Created by komal.chaudhary on 2/23/2016.
 */

//@name : Ctrl_Train_Between_Stations

angular.module("myApp").controller('Ctrl_Train_Between_Stations', [ '$scope', '$injector' ,'$rootScope', Ctrl_Train_Between_Stations] );

function Ctrl_Train_Between_Stations( $scope, $injector, $rootScope ) {

    $scope.optSuggSrcCode = "";
    $scope.optSuggDesCode = "";
    $scope.txtSuggTrainDate = "";
    $scope.betweens_form = true;        // Used for Display Between Form,  true->display false->hide
    $scope.availableStations = [];      // Used for Auto Complete Station Names
    $scope.stationSrc = [];                // used for holding all json data station name with it's code
    $scope.stationDes = [];                // used for holding all json data station name with it's code
    $scope.Trains_Between_Station = []; // used for holding Trains_Between_Station
    $scope.iv_error = false;                //display Error
    $scope.iv_error_msg = "";               // holds error message.
    $scope.displayLoaderAutocomplete_src = false;
    $scope.displayLoaderAutocomplete_des = false;
    $scope.displayMainLoader = false;
    $scope.blankDesResult = false;
    $rootScope.home_page = false;            // hide Home Page



    var Service_Station_List = $injector.get("Service_Station_List");       //inject Service Manually...

    var Service_Intermediator = $injector.get("Service_Intermediator");

    if ( Service_Intermediator.Train_Route.length !== 0 )
    {
        $scope.routes = Service_Intermediator.Train_Route;
    }
    else
    {

    }


    /*
     * @name  : txtStationName_keyUp
     * @type  : Function
     * @desc  : invoke on keyup event of both textbox i.e. source & destination station name
     * @param : evt, object, text
     *          evt -> Event Object
     *          obj -> Control Object on which event ocuures
     *          text -> typed text in textbox
     */
    $scope.txtStationName_keyUp = function(evt, obj, text){
        if(text.length > 2) {
            $scope.displayLoaderAutocomplete_src = true;
            var promise = Service_Station_List(text);
            promise.then(function (response) {
                $scope.displayLoaderAutocomplete_src = false;
                $scope.stationSrc = response.data.station;
                for (var i = 0; i < response.data.station.length; i++) {
                    $scope.availableStations[i] = response.data.station[i].fullname + " " + response.data.station[i].code;
                }
                $("#" + evt.target.id).autocomplete({
                    source: $scope.availableStations
                });
            });
        }
    }
    $scope.txtStationNameDes_keyUp = function(evt, obj, text){
        if(text.length > 2) {
            $scope.displayLoaderAutocomplete_des = true;
            var promise = Service_Station_List(text);
            promise.then(function (response) {
                $scope.displayLoaderAutocomplete_des = false;
                $scope.stationDes = response.data.station;
                for (var i = 0; i < response.data.station.length; i++) {
                    $scope.availableStations[i] = response.data.station[i].fullname + " " + response.data.station[i].code;
                }
                $("#" + evt.target.id).autocomplete({
                    source: $scope.availableStations
                });
            });
        }
    }

    /* @name : btnGetDetails
     * @type : Function
     * @desc : Click Event Function on Button Get Details.....
     *         invoke Service_Trains_between_stations Service & get data from API
     */
    $scope.btnGetDetails = function(){

        var optSuggSrcCode = $scope.optSuggSrcCode;
        var optSuggDesCode = $scope.optSuggDesCode;
        var txtSuggTrainDate = $scope.txtSuggTrainDate;

        optSuggSrcCode = document.getElementById("optSuggSrcCode").value;
        optSuggDesCode = document.getElementById("optSuggDesCode").value;
        txtSuggTrainDate = document.getElementById("txtSuggDatePicker").value;

        var inputDate = new Date(txtSuggTrainDate);
        var sysDate = new Date();

        $scope.optSuggSrcCode = optSuggSrcCode;
        $scope.optSuggDesCode = optSuggDesCode;
        var mydate = txtSuggTrainDate.split("-");
        var mydate = txtSuggTrainDate.split("-");
        var dd = $scope.txtSuggTrainDate.getDate();
        var mm = $scope.txtSuggTrainDate.getMonth() + 1;
        var yyyy = $scope.txtSuggTrainDate.getFullYear();

        txtSuggTrainDate = dd + "-" + mm;
        $scope.txtSuggTrainDate = txtSuggTrainDate + "-" + yyyy;

        //Validation
        var d = new Date();
        if(optSuggSrcCode.trim().length === 0 ) {
            $scope.iv_error = true;
            $scope.iv_error_msg = "Error : Invalid Source Station Name";
        }
        else if(optSuggDesCode.trim().length === 0)
        {
            $scope.iv_error = true;
            $scope.iv_error_msg = "Error : Invalid Destination Station Name";
        }
        else if(txtSuggTrainDate.trim().length === 0){
            $scope.iv_error = true;
            $scope.iv_error_msg = "Error : Enter Valid Date";
        }
        else if(!mydate[0] || !mydate[1] || !mydate[2]){
            $scope.iv_error = true;
            $scope.iv_error_msg = "Error : Enter Valid Date";
        }
        else if( inputDate < sysDate ){
            if((inputDate.getDay() === sysDate.getDay() && inputDate.getMonth() === sysDate.getMonth() && inputDate.getFullYear() === sysDate.getFullYear() )){
                $scope.Trains_between_stations(optSuggSrcCode, optSuggDesCode, txtSuggTrainDate);
            }
            else{
                $scope.iv_error = true;
                $scope.iv_error_msg = "Error : Date must be greater than equals to Today's Date";
            }
        }
        else {
            $scope.iv_error_msg = "";
            $scope.blankDesResult = false;
            //convert station name into station code from API

            var SrcName = optSuggSrcCode ;
            var DesName = optSuggDesCode ;
            optSuggSrcCode = optSuggSrcCode.split(" ").splice(-1)[0];
            optSuggDesCode = optSuggDesCode.split(" ").splice(-1)[0];

            $scope.Trains_between_stations(optSuggSrcCode,SrcName, optSuggDesCode, DesName, txtSuggTrainDate);

        }
    }

    $scope.Trains_between_stations = function(optSuggSrcCode, SrcName, optSuggDesCode, DesName, txtSuggTrainDate){

        $scope.blankDesResult = false;

            ///manually Inject Service_Trains_between_stations Sewrvice
            //param : source, dest, date
            //       Source : Source Station name
            //        Destination : Destination Station name
            //        date : Journey Date in DD-MM Format

            $scope.displayMainLoader = true;
            var Service_Trains_between_stations = $injector.get("Service_Trains_between_stations");
            var promise = Service_Trains_between_stations(optSuggSrcCode, optSuggDesCode, txtSuggTrainDate);
            promise.then(function (response) {
                $scope.displayMainLoader = false;
                $scope.Trains_Between_Station = response.data.train;
                if(response.data.train.length === 0){
                    //display error
                    alert("There is no direct reserved train");
                    $scope.blankDesResult = true;
                    $scope.blankDesResultMag = "There is no direct reserved train from " + SrcName + " to " + DesName;
                    $scope.betweens_form = true;
                }
                else
                    $scope.betweens_form = false;
            })
                .catch(
                function (reason) {
                    $scope.betweens_form = true;
                    $scope.displayMainLoader = false;
                });

    }


    /*
     * @name  : GoTrainRoute
     * @type  : Function
     * @desc  : Invoked when result row clicked
     * @param : train No will be send to Train Route View
     */
    $scope.GoTrainRoute = function(train_no){
        var location = $injector.get("$location");
        location.path("/landing_page:" + train_no);

    }

}
