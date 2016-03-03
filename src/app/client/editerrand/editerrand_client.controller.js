(function ()
{
    'use strict';

    angular
        .module('app.client.editerrand')
        .controller('EditerrandClientController', EditerrandClientController);

    /** @ngInject */
    EditerrandClientController.$inject = ['$log', '$scope', 'Restangular', '$stateParams', 'toastr', 
                'FileUploader', '$auth', 'API_URL'];
    function EditerrandClientController($log, $scope, Restangular, $stateParams, toastr, FileUploader, $auth, API_URL)
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

        vm.triggerFileInput = function(selectedInput)
        {
            vm.selectedInput = selectedInput;
            angular.element('#errand-uploader').trigger('click');
        }

        vm.autocompleteOptions = {
            componentRestrictions: { country: 'us' },
            types: ['geocode']
        }

        Restangular.all('client/alltypes').getList()
        .then(function(types) {
            // console.log(types);
            vm.alltypes = types;
        });

        Restangular.all('client/zoomoffices').getList()
        .then(function(offices) {
            // $log.log(types);
            vm.zoomoffices = offices;
        });

        var taskid = $stateParams.id;
        // console.log(taskid);
        Restangular.one('client/tasks', taskid).get()
        .then(function(task) {
            vm.errand = task;
            vm.addr = vm.errand.address;
            $log.log(vm.errand)

        });


        function updateErrand() {
            if ((vm.addr) && (vm.addr.types)) {                                
                vm.errand.address = vm.addr.formatted_address;
                vm.errand.addrlat = vm.addr.geometry.location.lat();
                vm.errand.addrlng = vm.addr.geometry.location.lng();    
            } else {
                if (!vm.errand.address) {
                    toastr.warning('Please input address exatly'); 
                    return;
                }
            }  
            var payload = {};
            payload = {title: vm.errand.title, datetime: vm.errand.datetime, address: vm.errand.address,
                  contact: vm.errand.contact, type_id: vm.errand.type_id, 
                  addrlat: vm.errand.addrlat, addrlng: vm.errand.addrlng, details: vm.errand.details, 
                  escrowable: vm.errand.escrowable};
            Restangular.one('client/tasks', taskid).customPUT({"task": payload})
            .then(function(data) {
                vm.uploader.url = API_URL + '/client/tasks/' + data.id + '/upload'
                vm.uploader.uploadAll();
                toastr.success('Your task \"' + data.title + '\" has been updated.', 'Errand Updated!');
            }, function(data) {
                toastr.warning(data.data.alert);
            });
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
