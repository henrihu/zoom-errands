(function ()
{
    'use strict';

    angular
        .module('app.client.myerrand')
        .controller('MyerrandClientController', MyerrandClientController);

    /** @ngInject */
    MyerrandClientController.$inject = ['$scope', 'Restangular', 'toastr'];
    function MyerrandClientController($scope, Restangular, toastr)
    {
        var vm = this; 
        vm.deleteTask = deleteTask;
        vm.loadMore = loadMore;
        vm.limit = 7;
        vm.curPos = 0;

        Restangular.all('client/tasks').getList({'limit': vm.limit, 'offset': vm.curPos})
        .then(function(tasks) {
            vm.tasks = tasks;
            vm.displayedtasks = [].concat(vm.tasks);
            vm.curPos = tasks.length;
            // $log.log(vm.displayedtasks);
        });

        function deleteTask(task) 
        {   
            Restangular.one('client/tasks', task.id).remove()
            .then(function(data) {
                var index = vm.tasks.indexOf(task);
                if (index !== -1) {
                    vm.tasks.splice(index, 1);
                    toastr.success('Your task ' + data.title + 'has been cancelled.');
                }
                
            }, function(error) {
                toastr.error(error);
            });

        }

        function loadMore()
        {
            Restangular.all('client/tasks').getList({'limit': vm.limit, 'offset': vm.curPos})
            .then(function(tasks) {
                vm.tasks = vm.tasks.concat(tasks);
                vm.displayedtasks = [].concat(vm.tasks);
                vm.curPos = vm.curPos + tasks.length;
                // $log.log(vm.displayedtasks);
            });
        }

    }
})();
