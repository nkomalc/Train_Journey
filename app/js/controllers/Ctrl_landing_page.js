/**
 * Created by komal.chaudhary on 2/20/2016.
 */
angular.module("myApp").controller('Ctrl_landing_page', [ '$scope', '$injector','$rootScope', Ctrl_landing_page] );

function Ctrl_landing_page( $scope, $injector, $rootScope ) {

    //Manually Inject all requied things
    var routeParams = $injector.get("$routeParams");
    var Service_Train_Route_Information = $injector.get("Service_Train_Route_Information");
    $rootScope.home_page = false;            // hide Home Page

    //Declare Required Variable in Landing Page Controller
    $scope.train = "";          //contains info about selected train with
    $scope.days = ["-"];           //contain info about train avaiability on days
    $scope.routes = [];          //contain train route info
    $scope.JN_Names = [];          //contain train route info
    $scope.sourceCode = "";         // used for passing it to Service Seat Availability
    $scope.desCode = "";            // used for passing it to Service Seat Availability
    $scope.seat_availability = [];  // used for holding seat_availability API
    $scope.Train_Fare_Enquiry = []; // used for hloding Train Fare Enquiry

    $rootScope.showGoogleMap = false;


    //Request for Train Toute Information JSON using train no
    var train_no = routeParams.train_no.replace(":","");
    $rootScope.train_route_loader = true;
    var promise = Service_Train_Route_Information(train_no);
    promise.then(function(response) {


        var Service_Intermediator = $injector.get("Service_Intermediator");
        var Service_Intermediator_Selected_Train = $injector.get("Service_Intermediator_Selected_Train");

        $scope.train = response.data.train;
        $scope.routes = response.data.route;

        for(var i = 0; i < response.data.train.days.length; i++){
            if(response.data.train.days[i].runs === "Y")
            {
                $scope.days[i] = response.data.train.days[i]["day-code"];

            }
        }
        $scope.txtTrainNo = $scope.train.number;
        $rootScope.train_route_loader = false;              // hides the  loader
        $rootScope.showGoogleMap = true;                    // show google map options

        Service_Intermediator.Train_Route = $scope.routes;  //store Route info into the Intermediator Service
        Service_Intermediator_Selected_Train.Train = $scope.train;  //store Train Into into Intermediator Service
        //$scope.displayMap();
    } );








}


//Ctrl_landing_page