(function ()
{
    'use strict';

    angular
        .module('app.provider.editerrand')
        .controller('EditerrandProviderController', EditerrandProviderController);

    /** @ngInject */
    EditerrandProviderController.$inject = [ '$scope', 'Restangular', '$stateParams', 'toastr', 'FileUploader', '$auth'];
    function EditerrandProviderController($scope, Restangular, $stateParams, toastr, FileUploader, $auth)
    {
        var vm = this; 
        vm.updateErrand = updateErrand; 

        var taskid = $stateParams.id;
        // console.log(taskid);
        Restangular.one('provider/tasks', taskid).get()
        .then(function(task) {
            vm.job = task;
        });

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


        function updateErrand() {
            var payload = {};
            payload = {title: vm.errand.title, datetime: vm.errand.datetime, address: vm.errand.address,
                        contact: vm.errand.contact, type_id: vm.errand.type_id, 
                        details: vm.errand.details, escrowable: vm.errand.escrowable};
            Restangular.one('provider/tasks', taskid).put(payload)
            .then(function(data) {
                toastr.success('Your task \"' + data.title + '\" has been updated.', 'Errand Updated!');
            }, function(data) {
                toastr.warning(data.data.alert);
            });
        }

        
        
    }

})();
