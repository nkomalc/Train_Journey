/**
 * Created by komal.chaudhary on 2/24/2016.
 */

angular.module("myApp").controller('Ctrl_Fare_Enquiry', [ '$scope', '$injector','$rootScope', Ctrl_Fare_Enquiry] );

function Ctrl_Fare_Enquiry( $scope, $injector, $rootScope ) {
    $rootScope.home_page = false;            // hide Home Page


    //manually inject Service_Intermediator_Selected_Train
    var Service_Intermediator_Selected_Train = $injector.get("Service_Intermediator_Selected_Train");
    $scope.train = Service_Intermediator_Selected_Train.Train;
    var Service_Intermediator = $injector.get("Service_Intermediator");
    $scope.routes = Service_Intermediator.Train_Route;
    if($scope.routes.length === 0) {
        var location = $injector.get("$location");
        location.path("#" );
        $rootScope.btnHome_Click();
    }


    $scope.errorMsg = "";
    $scope.displayError = false;
    $scope.txtTrainNo = $scope.train.number;
    $scope.displayMainLoader = false;
    $scope.displayResult = false;


    /*
     * @name  : btnGetFare
     * @desc  : Invoked on Click Event of Button Get Fare
     */
    $scope.btnGetFare = function(){
        var txtTrainNo = $scope.txtTrainNo;
        var txtTrainDate = $scope.txtTrainDate;
        var optFareSrcCode = $scope.optFareSrcCode;
        var optFareDesCode = $scope.optFareDesCode;
        var txtAge = $scope.txtAge;
        var optFareQuota = $scope.optFareQuota;

        var inputDate = new Date(txtTrainDate);
        var sysDate = new Date();
        txtTrainDate = document.getElementById("txtDatePicker").value;
        var date = txtTrainDate.split("-");
        //var dd = date[2];
        //var mm = date[1];
        //var yyyy = date[0];
        var dd = $scope.txtTrainDate.getDate();
        var mm = $scope.txtTrainDate.getMonth() + 1;
        var yyyy = $scope.txtTrainDate.getFullYear();

        txtTrainDate = dd + "-" + mm + "-" + yyyy;

        $scope.displayError = false;
        $scope.displayResult = false;
        if(txtAge === undefined || parseInt(txtAge) == 0)
        {
            $scope.displayError = true;
            $scope.errorMsg = "Error : Enter Valid Age.";
        }
        else if(optFareSrcCode === undefined)
        {
            $scope.displayError = true;
            $scope.errorMsg = "Error : Select Source & Destination Station.";
        }
        else if(optFareDesCode === undefined)
        {
            $scope.displayError = true;
            $scope.errorMsg = "Error : Select Source & Destination Station.";
        }
        else if(!parseInt(date[0]) || !parseInt(date[1]) || !parseInt(date[2])){
            $scope.displayError = true;
            $scope.errorMsg = "Error : Enter Valid Date";
        }
        else if( inputDate < sysDate ){
            if((inputDate.getDay() === sysDate.getDay() && inputDate.getMonth() === sysDate.getMonth() && inputDate.getFullYear() === sysDate.getFullYear() )){
                $scope.getTrain_Fare_Enquiry(txtTrainNo, optFareSrcCode, optFareDesCode, txtAge, txtTrainDate, optFareQuota);
            }
            else{
                $scope.displayError = true;
                $scope.errorMsg = "Error : Date must be greater than equals to Today's Date";
            }
        }
        else
        {
            $scope.getTrain_Fare_Enquiry(txtTrainNo, optFareSrcCode, optFareDesCode, txtAge, txtTrainDate, optFareQuota);
        }

        //alert("txtTrainNo = " + txtTrainNo +  "\n" +
        //    "txtTrainDate = " + txtTrainDate + "\n" +
        //    "optFareSrcCode = " + optFareSrcCode.length +  "\n" +
        //    "optFareDesCode = " + optFareDesCode + "\n" +
        //    "txtAge = " + txtAge +  "\n" +
        //    "optFareQuota = " + optFareQuota + "\n" );
    }

    $scope.getTrain_Fare_Enquiry = function (txtTrainNo, optFareSrcCode, optFareDesCode, txtAge, txtTrainDate, optFareQuota) {

        //alert("txtTrainNo = " + txtTrainNo +  "\n" +
        //    "txtTrainDate = " + txtTrainDate + "\n" +
        //    "optFareSrcCode = " + optFareSrcCode +  "\n" +
        //    "optFareDesCode = " + optFareDesCode + "\n" +
        //    "txtAge = " + txtAge +  "\n" +
        //    "optFareQuota = " + optFareQuota + "\n" );

        $scope.displayMainLoader = true;


        // inject service manually
        // Service :- Service_Train_Fare_Enquiry
        // train_name_no, source_code, dest_code, age, doj, quota_code
        var Service_Train_Fare_Enquiry = $injector.get("Service_Train_Fare_Enquiry");
        var promise = Service_Train_Fare_Enquiry(txtTrainNo, optFareSrcCode, optFareDesCode, txtAge, txtTrainDate, optFareQuota);
        promise.then(function(response) {
            $scope.Train_Fare_Enquiry = response.data;
            $scope.txtTrainDate = txtTrainDate;
            $scope.displayMainLoader = false;
            $scope.displayResult = true;
        } )
            .catch(
            function (reason) {
                $scope.betweens_form = true;
                $scope.displayMainLoader = false;
                $scope.displayResult = false;
                alert(reason);
            });
    }
}