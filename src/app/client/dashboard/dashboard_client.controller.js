(function ()
{
    'use strict';

    angular
        .module('app.client.dashboard')
        .controller('DashboardClientController', DashboardClientController);

    /** @ngInject */
    DashboardClientController.$inject = ['$log', '$scope', 'toastr', 'Restangular', 'FileUploader', 'API_URL', '$auth'];
    function DashboardClientController($log, $scope, toastr, Restangular, FileUploader, API_URL, $auth)
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

        vm.autocompleteOptions = {
            componentRestrictions: { country: 'us' },
            types: ['geocode']
        }

        Restangular.all('client/alltypes').getList()
        .then(function(types) {
            // $log.log(types);
            vm.alltypes = types;
        });

        Restangular.all('client/zoomoffices').getList()
        .then(function(offices) {
            // $log.log(types);
            vm.zoomoffices = offices;
        });

        vm.openCalendar = function(e) { 
            e.preventDefault();
            e.stopPropagation();

            vm.isOpen = true;
        };

        

        function submitErrand() {            
            
            if (vm.addr.types) {
                // var p = vm.addr;
                // for (var i = 0; i < p.address_components.length; i++) {
                //   var addressType = p.address_components[i].types[0];
                //   if (addressType=="locality"){
                //     vm.errand.longCity = p.address_components[i]['long_name'];
                //     // vm.shortCity = p.address_components[i]['short_name'];
                //     break;              
                //   }
                // }
                // if (null === vm.errand.longCity || angular.isUndefined === vm.errand.longCity) {
                //     toastr.warning('Please input city exatly');   
                //     return; 
                // }
                
                vm.errand.address = vm.addr.formatted_address;
                vm.errand.addrlat = vm.addr.geometry.location.lat();
                vm.errand.addrlng = vm.addr.geometry.location.lng();
                Restangular.all('client/tasks').post({task: vm.errand})
                .then(function(data) {
                    // $log.log(data);
                    vm.uploader.url = API_URL + '/client/tasks/' + data.id + '/upload'
                    vm.uploader.uploadAll();
                    toastr.success('Your task ' + data.title + ' has been accepted.', 'Accept!');
                    // $state.go('app.client.myerrand');
                }, function(data) {
                    $log.log(data);
                    toastr.warning(data.data.alert);
                });
            }else {
                toastr.warning('Please input address exatly');           
            }
            
        }

        vm.uploader.onBeforeUploadItem = function(item) 
        {
            item.url = vm.uploader.url;
        };

        vm.uploader.onCompleteAll = function() {
            
            vm.uploader.clearQueue();
            // $state.go('app.client.myerrand');
        }
    }

})();
