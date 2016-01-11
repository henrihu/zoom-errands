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

        vm.autocompleteOptions = {
            componentRestrictions: { country: 'us' },
            types: ['(cities)']
        }

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
            // $log.log(vm.errand.addr.formatted_address, vm.errand.addr.geometry.location.lat(), vm.errand.addr.geometry.location.lng());
            if (vm.errand.addr.types) {
                vm.errand.address = vm.errand.addr.formatted_address;
                vm.errand.addrlat = vm.errand.addr.geometry.location.lat();
                vm.errand.addrlng = vm.errand.addr.geometry.location.lng();
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
            $state.go('app.client.myerrand');
        }
    }

})();
