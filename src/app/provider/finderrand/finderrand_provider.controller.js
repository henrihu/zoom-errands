(function ()
{
    'use strict';

    angular
        .module('app.provider.finderrand')
        .controller('FinderrandProviderController', FinderrandProviderController);

    /** @ngInject */
    FinderrandProviderController.$inject = ['$scope', 'Restangular'];
    function FinderrandProviderController($scope, Restangular)
    {
        var vm = this;
        vm.loadMore = loadMore;
        vm.limit = 7;
        vm.curPos = 0;

        Restangular.one('provider/tasks/findtasks').get({'limit': vm.limit, 'offset': vm.curPos})
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
