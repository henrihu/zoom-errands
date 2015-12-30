(function ()
{
    'use strict';

    angular
        .module('app.client.editerrand')
        .controller('EditerrandClientController', EditerrandClientController);

    /** @ngInject */
    EditerrandClientController.$inject = [ '$scope', 'Restangular', '$stateParams', 'toastr'];
    function EditerrandClientController($scope, Restangular, $stateParams, toastr)
    {
        var vm = this; 
        vm.updateErrand = updateErrand; 
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
            // console.log(types);
            vm.alltypes = types;
        });

        var taskid = $stateParams.id;
        // console.log(taskid);
        Restangular.one('client/tasks', taskid).get()
        .then(function(task) {
            vm.errand = task;
        });


        function updateErrand() {
            var payload = {};
            payload = {title: vm.errand.title, datetime: vm.errand.datetime, address: vm.errand.address,
                        contact: vm.errand.contact, type_id: vm.errand.type_id, 
                        details: vm.errand.details, escrowable: vm.errand.escrowable};
            Restangular.one('client/tasks', taskid).put(payload)
            .then(function(data) {
                toastr.success('Your task \"' + data.title + '\" has been updated.', 'Errand Updated!');
            }, function(data) {
                toastr.warning(data.data.alert);
            });
        }

        
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
