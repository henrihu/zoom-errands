(function ()
{
    'use strict';

    angular
        .module('app.client.dashboard')
        .controller('DashboardClientController', DashboardClientController);

    /** @ngInject */
    DashboardClientController.$inject = ['$log', '$scope', 'toastr', 'Restangular', 'FileUploader', 'API_URL', '$auth', '$state'];
    function DashboardClientController($log, $scope, toastr, Restangular, FileUploader, API_URL, $auth, $state)
    {
        var vm = this; 
        vm.submitErrand = submitErrand; 
        vm.errand = {}; 
        vm.errand.contact = $scope.user.phone1;

        vm.isOpen = false;
        vm.uploader = new FileUploader({
            
            alias: 'upload',
            // method: 'PUT',
            headers: $auth.retrieveData('auth_headers')              
        });

        vm.uploader.filters.push({
            name: 'customFilter',
            fn: function() {
                return vm.uploader.queue.length < 5;
            }
        });

        vm.openCalendar = function(e) { 
            e.preventDefault();
            e.stopPropagation();

            vm.isOpen = true;
        };

        Restangular.all('client/alltypes').getList()
        .then(function(types) {
            // $log.log(types);
            vm.alltypes = types;
        });

        function submitErrand() {
            Restangular.all('client/tasks').post({task: vm.errand})
            .then(function(data) {
                // $log.log(data);
                vm.uploader.url = API_URL + '/client/tasks/' + data.id + '/upload'
                vm.uploader.uploadAll();
                toastr.success('Your task ' + data.title + ' has been accepted.', 'Accept!');
                // $state.go('app.client.myerrand');
            }, function(data) {
                // $log.log(data)
                toastr.warning(data.data.alert);
            });

            // vm.uploader.alias = 'photo';
            // vm.uploader.method = 'POST';
            // vm.uploader.headers = $auth.retrieveData('auth_headers');
            
        }

        vm.uploader.onBeforeUploadItem = function(item) 
        {
            item.url = vm.uploader.url;
        };

        vm.uploader.onCompleteAll = function() {
            
            vm.uploader.clearQueue();
            $state.go('app.client.myerrand');
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
