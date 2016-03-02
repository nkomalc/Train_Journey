/**
 * Created by komal.chaudhary on 2/23/2016.
 */

//used to display Train Route Information on the Map

angular.module("myApp").controller('Ctrl_Google_Map', [ '$scope', '$injector','$rootScope', Ctrl_Google_Map] );

function Ctrl_Google_Map( $scope, $injector, $rootScope ) {


//Initialize & Display Google Map
//    $scope.displayMap = function () {
        var Service_Intermediator = $injector.get("Service_Intermediator");
    $rootScope.home_page = false;            // hide Home Page


        if ( Service_Intermediator.Train_Route.length !== 0) {

            var routes = Service_Intermediator.Train_Route;
            var bound = new google.maps.LatLngBounds();

            for (var i = 0; i < routes.length; i++) {
                bound.extend( new google.maps.LatLng( routes[i].lat , routes[i].lng  ) );
                //$scope.JN_Names[i] = $scope.routes[i].fullname;
                // OTHER CODE
            }

            var lati = bound.getCenter().lat();
            var lngi = bound.getCenter().lng();

            //console.log( tempdata );


            var map = new google.maps.Map(document.getElementById('map1'), {
                zoom: 6,
                center: {lat: lati, lng: lngi},
                mapTypeId: google.maps.MapTypeId.TERRAIN
            });

            var infowindow = new google.maps.InfoWindow();

            var marker, i, prelat, prelng, mrkColor;
            prelat = routes[0].lat;
            prelng = routes[0].lng;

            for (i = 0; i < routes.length; i++) {

                mrkColor = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
                mrkColor = 'http://maps.google.com/mapfiles/ms/micons/flag.png';

                if(i === 0 || i === routes.length - 1)
                    mrkColor = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';

                var line = new google.maps.Polyline({
                    path: [
                        new google.maps.LatLng(prelat, prelng),
                        new google.maps.LatLng( routes[i].lat , routes[i].lng )
                    ],
                    strokeColor: "blue",
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                    map: map
                });
                prelat = routes[i].lat;
                prelng = routes[i].lng;

                marker = new google.maps.Marker({
                    position: new google.maps.LatLng( routes[i].lat , routes[i].lng ),
                    icon : mrkColor,
                    animation: google.maps.Animation.DROP,
                    map: map
                });

                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infowindow.setContent( routes[i].fullname );
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }

            //Animation
            var marker1 = new google.maps.Marker({
                position: new google.maps.LatLng( routes[0].lat , routes[0].lng ),
                icon : "http://maps.google.com/mapfiles/kml/paddle/blu-blank.png",
                animation: google.maps.Animation.DROP,
                map: map
            });

            counter = 1;
            var route_Length = routes.length;

            interval = window.setInterval(function () {
                counter++;
                if (counter >= route_Length) {
                    //window.clearInterval(interval);
                    counter = 0;
                }
                var pos = new google.maps.LatLng(routes[counter].lat , routes[counter].lng);
                marker1.setPosition(pos);


            }, 520);
            //http://maps.google.com/mapfiles/kml/pal4/icon49.png

    }
    else{
            var location = $injector.get("$location");
            location.path("#" );
            $rootScope.btnHome_Click();
    }

}
