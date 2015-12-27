(function ()
{
    'use strict';

    angular
        .module('app.client.editerrand')
        .controller('EditerrandClientController', EditerrandClientController);

    /** @ngInject */
    EditerrandClientController.$inject = [ '$scope', 'Restangular', '$stateParams'];
    function EditerrandClientController($scope, Restangular, $stateParams)
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
            console.log(types);
            vm.alltypes = types;
        });

        var taskid = $stateParams.id;
        console.log(taskid);
        Restangular.one('client/tasks', taskid).get()
        .then(function(task) {
            vm.errand = task;
        });

        
        var marker;
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

        function submitErrand() {
            Restangular.all('client/tasks').post({task: vm.errand});
        }
    }

})();
