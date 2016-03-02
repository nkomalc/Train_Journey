/**
 * Created by komal.chaudhary on 2/19/2016.
 */

angular.module("myApp").controller('Ctrl_Search', [ '$scope', '$injector' ,'$rootScope' ,'Service_TrainAutoComplete' , Ctrl_Search] );

function Ctrl_Search( $scope, $injector, $rootScope, Service_TrainAutoComplete ) {
    //alert("Ctrl_Search");
    $scope.availableTags = [ ];
    $rootScope.showGoogleMap = false;       //hide google Map Option
    $rootScope.home_page = true;            // display Home Page
    $scope.displayLoaderAutocomplete = false;   //Display Loader Autocomplete


    //$scope.btnHome_Click = function(){
    //    $rootScope.home_page = true;
    //    //alert("$rootScope.home_page = " + $rootScope.home_page);
    //}

    /**
     * @name complete
     * @desc Invoke on text change event on Search Textbox & ng-model is txtSearch
     *       used for autocomplete
     */
    var promise = Service_TrainAutoComplete();
    $scope.tarinAutoCompleteLoaded = false;


    $scope.complete = function (myEvent) {
        if(myEvent.keyCode == 13)
        { var text = $scope.txtSearch;
            if(text.length > 0) {
                $scope.goLandPage();
            }
        }
        else {
            var text = $scope.txtSearch;
            if( text ) {


                if (text.length > 2) {                           // check string length

                    $scope.displayLoaderAutocomplete = true;
                    //var promise = Service_TrainAutoComplete(text);
                    //promise.then(function(response) {
                    //    $scope.displayLoaderAutocomplete = false;
                    //    $scope.availableTags = response.data.train;
                    //    $("#tags").autocomplete({
                    //        source: $scope.availableTags
                    //    });
                    //} );
                    if (!$scope.tarinAutoCompleteLoaded) {
                        promise.then(function (response) {
                            $scope.displayLoaderAutocomplete = false;
                            $scope.availableTags = response.data;
                            $("#tags").autocomplete({
                                source: $scope.availableTags
                            });
                            $scope.tarinAutoCompleteLoaded = true;

                        });
                    }
                    else
                        $scope.displayLoaderAutocomplete = false;
                }
            }
        }
    }
    /*
     * @name btnSearch_Click
     * @desc call on click event of Search button from Index.html
     */
    $scope.btnSearch_Click = function() {

        var text = $scope.txtSearch;
        if(text.length > 0) {
            $scope.goLandPage();
        }
    }

    /*
     * @name goLandPage
     * @desc Used for display next view
     */
    $scope.goLandPage = function(){

        $rootScope.train_route_loader = true;

        //logic for extract number from String
        var txt = $scope.txtSearch;
        txt = document.getElementById("tags").value;

        var numb = txt.match(/\d/g);
        numb = numb.join("");
        //alert("Train No " + numb);

        var location = $injector.get("$location");
        location.path("/landing_page:" + numb);

    }


}
