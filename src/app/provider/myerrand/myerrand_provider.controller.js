(function ()
{
    'use strict';

    angular
        .module('app.provider.myerrand')
        .controller('MyerrandProviderController', MyerrandProviderController);

    /** @ngInject */
    MyerrandProviderController.$inject = ['$scope', 'Restangular'];
    function MyerrandProviderController($scope, Restangular)
    {
        var vm = this; 
        vm.loadMore = loadMore;
        vm.limit = 7;
        vm.curPos = 0;

        Restangular.all('provider/tasks/mytasks').getList({'limit': vm.limit, 'offset': vm.curPos})
        .then(function(tasks) {
            vm.tasks = tasks;
            vm.displayedtasks = [].concat(vm.tasks);
            vm.curPos = tasks.length;
            // $log.log(vm.displayedtasks);
        });


        function loadMore()
        {
            Restangular.all('client/tasks/mytasks').getList({'limit': vm.limit, 'offset': vm.curPos})
            .then(function(tasks) {
                vm.tasks = vm.tasks.concat(tasks);
                vm.displayedtasks = [].concat(vm.tasks);
                vm.curPos = vm.curPos + tasks.length;
                // $log.log(vm.displayedtasks);
            });
        }

    }
})();
