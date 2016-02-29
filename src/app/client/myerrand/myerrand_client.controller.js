(function ()
{
    'use strict';

    angular
        .module('app.client.myerrand')
        .controller('MyerrandClientController', MyerrandClientController);

    /** @ngInject */
    MyerrandClientController.$inject = ['$scope', 'Restangular', 'toastr', '$log'];
    function MyerrandClientController($scope, Restangular, toastr, $log)
    {
        var vm = this; 

        vm.limit = 5;
        vm.curPos = 0;

        Restangular.one('client/tasks/mytasks').get({'limit': vm.limit, 'offset': vm.curPos})
        .then(function(resp) {   
            vm.tasks = resp.tasks;
            vm.displayedtasks = [].concat(vm.tasks);
            vm.curPos = resp.tasks.length;
            vm.moredata = resp.moredata;
        });

        vm.deleteTask = function(task) 
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

        vm.loadMore = function()
        {
            Restangular.one('client/tasks/mytasks').get({'limit': vm.limit, 'offset': vm.curPos})
            .then(function(resp) {
                $log.log(resp);
                vm.tasks = vm.tasks.concat(resp.tasks);
                vm.displayedtasks = [].concat(vm.tasks);
                vm.curPos = vm.curPos + resp.tasks.length;
                vm.moredata = resp.moredata;
            });
        }

    }
})();
