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

        Restangular.one('provider/tasks/mytasks').get({'limit': vm.limit, 'offset': vm.curPos})        
        .then(function(resp) {   
            vm.tasks = resp.tasks;
            vm.displayedtasks = [].concat(vm.tasks);
            vm.curPos = resp.tasks.length;
            vm.moredata = resp.moredata;
        });


        function loadMore()
        {
            Restangular.one('provider/tasks/mytasks').get({'limit': vm.limit, 'offset': vm.curPos})   
            .then(function(resp) {
                vm.tasks = vm.tasks.concat(resp.tasks);
                vm.displayedtasks = [].concat(vm.tasks);
                vm.curPos = vm.curPos + resp.tasks.length;
                vm.moredata = resp.moredata;
            });
        }

    }
})();
