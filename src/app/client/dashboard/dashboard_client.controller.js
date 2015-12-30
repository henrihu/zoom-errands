(function ()
{
    'use strict';

    angular
        .module('app.client.dashboard')
        .controller('DashboardClientController', DashboardClientController);

    /** @ngInject */
    DashboardClientController.$inject = ['$log', '$scope', 'toastr', 'Restangular'];
    function DashboardClientController($log, $scope, toastr, Restangular)
    {
        var vm = this; 
        vm.submitErrand = submitErrand; 
        vm.errand = {}; 
        vm.errand.contact = $scope.user.phone1;

        vm.isOpen = false;
        vm.openCalendar = function(e) { 
            e.preventDefault();
            e.stopPropagation();

            vm.isOpen = true;
        };

        Restangular.all('client/alltypes').getList()
        .then(function(types) {
            $log.log(types);
            vm.alltypes = types;
        });

        function submitErrand() {
            Restangular.all('client/tasks').post({task: vm.errand})
            .then(function(data) {
                $log.log(data);
                toastr.success('Your task ' + data.title + ' has been accepted.', 'Accept!');
            }, function(data) {
                toastr.wanning(data.alert);
            });
        }

        // Restangular.one('client/tasks', ).get

        
        // var marker;
        // vm.mapInit = initialize;
        // initialize();

        // function initialize() {
        //     var latlng = new google.maps.LatLng(34.0592467,-118.4422422);

        //     var myOptions = {
        //         zoom: 12,
        //         center: latlng,
        //         mapTypeId: google.maps.MapTypeId.ROADMAP,
        //         streetViewControl: false,
        //         mapTypeControl: false,
        //         scrollwheel: false
        //     };

        //     var map = new google.maps.Map(document.getElementById("map_canvas"),
        //             myOptions);


        //     google.maps.event.addListener(map, 'click', function(event) {
        //         placeMarker(event.latLng);
        //         vm.errand.address = event.latLng.toString();
        //     });

        //     function placeMarker(location) {
        //         if (marker == undefined){
        //             marker = new google.maps.Marker({
        //                 position: location,
        //                 map: map,
        //                 animation: google.maps.Animation.DROP
        //             });
        //         }
        //         else{
        //             marker.setPosition(location);
        //         }
        //         map.setCenter(location);

        //     }
        // };

        
    }

})();
