(function ()
{
    'use strict';

    angular
        .module('app.provider.editerrand')
        .controller('EditerrandProviderController', EditerrandProviderController);

    /** @ngInject */
    EditerrandProviderController.$inject = ['$state', '$log', 'API_URL', '$scope', 'Restangular', '$stateParams', 'toastr', 'FileUploader', '$auth'];
    function EditerrandProviderController($state, $log, API_URL, $scope, Restangular, $stateParams, toastr, FileUploader, $auth)
    {
        var vm = this;
        var taskid = $stateParams.id;
        vm.imgFiles = [];
        vm.completeTask = completeTask;


        // console.log(taskid);
        Restangular.one('provider/tasks', taskid).get()
        .then(function(task) {
            vm.job = task;
            if (vm.job.status == 'open') {
                vm.job.usedEscrow = vm.job.funds;
            }
        });

        vm.uploader = new FileUploader({
            alias: 'upload',
            // method: 'PUT',
            headers: $auth.retrieveData($auth.getConfig().keyAuthHeader)
        });

        vm.uploader.filters.push({
            name: 'customFilter',
            fn: function() {
                return vm.uploader.queue.length < 5;
            }
        });

        vm.uploader.onAfterAddingFile = function(item) {
            if (vm.uploader.queue.length !== 1){
                vm.uploader.removeFromQueue(0); // only one file in the queue
            }

            // item.method = 'PUT';
            item.url = API_URL + '/provider/tasks/' + taskid + '/upload'
            item.upload();
        };

        vm.uploader.onSuccessItem = function(item, response) {
            toastr.success('File has been uploaded successfully!');
            $log.log('item', item);
            $log.log('response', response);
            var img = {};
            img
            vm.imgFiles.push({thumbUrl: response.thumbUrl, uploadUrl: response.uploadUrl});
        };

        vm.uploader.onErrorItem = function(item, response) {
            toastr.error(response.errors[0]);
            // console.log(response);
        };

        function completeTask() {
            var task = Restangular.one('provider/tasks', taskid).one('complete')
            task.usedEscrow = vm.job.usedEscrow
            task.usedHour = vm.job.usedHour
            task.put()
            .then(function() {
                toastr.success('Your task has been completed.', 'Job Completed!');
                $state.go('app.provider.myerrand');
            }, function(data) {
                toastr.error(data.data.errors);
            });
        }

        vm.cancelTask = function() {
            var task = Restangular.one('provider/tasks', taskid).one('cancel')
            task.put()
            .then(function() {
                toastr.success('You cancelled this task.', 'Job cancelled.');
                $state.go('app.provider.myerrand');
            }, function(data) {
                toastr.error(data.data.errors);
            });
        };



    }

})();
