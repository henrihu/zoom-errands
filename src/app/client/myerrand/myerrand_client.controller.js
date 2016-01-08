(function ()
{
    'use strict';

    angular
        .module('app.client.myerrand')
        .controller('MyerrandClientController', MyerrandClientController);

    /** @ngInject */
    MyerrandClientController.$inject = ['$log', '$scope', 'Restangular', 'toastr'];
    function MyerrandClientController($log, $scope, Restangular, toastr)
    {
        var vm = this; 
        vm.deleteTask = deleteTask;

        Restangular.all('client/tasks').getList()
        .then(function(tasks) {
            vm.tasks = tasks;
            vm.displayedtasks = [].concat(vm.tasks);
            $log.log(vm.displayedtasks);
        });

        function deleteTask(taskid) 
        {   
            Restangular.one('client/tasks', taskid).remove()
            .then(function(data) {
                // vm.tasks.slice(data.id);
                toastr.success('Your task ' + data.title + 'has been cancelled.');
            }, function(error) {
                toastr.error(error);
            });

        }

    }
})();
