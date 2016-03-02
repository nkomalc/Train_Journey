/**
 * Created by komal.chaudhary on 2/24/2016.
 */

angular.module("myApp").controller('Ctrl_Seat_Availability', [ '$scope', '$injector' ,'$rootScope', Ctrl_Seat_Availability] );

function Ctrl_Seat_Availability( $scope, $injector, $rootScope, Service_TrainAutoComplete ) {

    $scope.stationSrc = [];         //used for hold list of Names of Source Station List
    $scope.stationDes = [];         //used for hold list of Names of Destination Station List
    $scope.train = [];              // used for Selected train info
    $scope.routes = [];             // used for holding routes info for a train
    $scope.displatResultTable = false;  // True -> display    false -> No display
    $rootScope.home_page = false;            // hide Home Page
    $scope.iv_error_msg = "";             // display error message
    $scope.DisplayResultError = false;
    $scope.displayMainLoader = false;

    $scope.iv_error = false;

    //manually inject Service_Intermediator_Selected_Train
    var Service_Intermediator_Selected_Train = $injector.get("Service_Intermediator_Selected_Train");
    $scope.train = Service_Intermediator_Selected_Train.Train;
    var Service_Intermediator = $injector.get("Service_Intermediator");
    $scope.routes = Service_Intermediator.Train_Route;

    if($scope.routes.length === 0 || $scope.train.length === 0){
        var location = $injector.get("$location");
        location.path("#" );
        $rootScope.btnHome_Click();
    }

    /*
     * @name  : txtStationName_keyUp($event,this, optSrcCode)
     * @param : $event,this, optSrcCode
     *          $event Object
     *          this current object
     *          optSrcCode ; Types text
     * @desc  : Invoked on keyup event of source textbox
     */
    $scope.txtStationName_keyUp = function(evt, obj, text){
        if(text.length > 2) {
            var promise = new Service_Station_List(text);
            promise.then(function (response) {
                $scope.stationSrc = response.data.station;
                for (var i = 0; i < response.data.station.length; i++) {
                    $scope.availableStations[i] = response.data.station[i].fullname;
                }
                $("#" + evt.target.id).autocomplete({
                    source: $scope.availableStations
                });
            });
        }
    }
    $scope.txtStationNameDes_keyUp = function(evt, obj, text){
        if(text.length > 2) {
            var promise = Service_Station_List(text);
            promise.then(function (response) {
                $scope.stationDes = response.data.station;
                for (var i = 0; i < response.data.station.length; i++) {
                    $scope.availableStations[i] = response.data.station[i].fullname;
                }
                $("#" + evt.target.id).autocomplete({
                    source: $scope.availableStations
                });
            });
        }
    }


    /*
     *  @name btnSeatAvailability
     *  @desc : Invoke on Button Click Event for Seat Availability
     *          Used for Display Seat Availability for a train on given date with class & category
     */
    $scope.btnSeatAvailability = function() {


        $scope.displatResultTable = false;

        var train_no = $scope.train.number;
        var optSrcCode = $scope.optSrcCode;
        var optDesCode = $scope.optDesCode;
        var doj = $scope.doj;
        doj = document.getElementById("datepicker").value;
        var optClass = $scope.optClass;
        var optQuota = $scope.optQuota;

        var msec = Date.parse(doj);
        var inputDate = new Date(msec);
        var sysDate = new Date();

        var date = doj.split("-");
        /*var dd = date[2];
        var mm = date[1];
        var yyyy = date[0];*/
        var dd = $scope.doj.getDate();
        var mm = $scope.doj.getMonth() + 1;
        var yyyy = $scope.doj.getFullYear();
        doj = dd + "-" + mm + "-" + yyyy;
        //$scope.doj = doj;

        if(!date[0] || !date[1] || !date[2]){
            $scope.iv_error = true;
            $scope.iv_error_msg = "Error : Enter Valid Date";
        }
        else if( inputDate < sysDate ){
            if((inputDate.getDay() === sysDate.getDay() && inputDate.getMonth() === sysDate.getMonth() && inputDate.getFullYear() === sysDate.getFullYear() )){
                $scope.check_Seat_Availability(train_no, optSrcCode, optDesCode, doj, optClass, optQuota);
            }
            else{
                $scope.iv_error = true;
                $scope.iv_error_msg = "Error : Date must be greater than equals to Today's Date";
            }
        }
        else{


            $scope.check_Seat_Availability(train_no, optSrcCode, optDesCode, doj, optClass, optQuota);


        }



    }
    /* inject Service_Seat_Availability factory
     * @param : train_name_no, source_code, dest_code, doj, class_code, quota_code
     */
    $scope.check_Seat_Availability = function(train_no, optSrcCode, optDesCode, doj, optClass, optQuota){

        $scope.iv_error = false;
        $scope.displayMainLoader = true;
        $scope.DisplayResultError = false;
        //alert("optSrcCode = " + optSrcCode+  "\n" +
        //    "optDesCode = " + optDesCode + "\n" +
        //    "doj = " + doj +  "\n" +
        //    "optClass = " + optClass + "\n" +
        //    "optQuota = " + optQuota + "\n" );

        var Service_Seat_Availability = $injector.get("Service_Seat_Availability");
        var promise = Service_Seat_Availability(train_no, optSrcCode, optDesCode, doj, optClass, optQuota);
        promise.then(function(response) {
            $scope.seat_availability = response.data;
            $scope.seat_availability = response.data;
            $scope.displatResultTable = true;
            if($scope.seat_availability.availability.length === 0){
                $scope.displatResultTable = false;
                $scope.DisplayResultError = true;
            }
            $scope.displayMainLoader = false;
            $scope.doj = doj;
        } )
        .catch(
        function(reason) {
            $scope.displatResultTable = false;
        });
    }

}