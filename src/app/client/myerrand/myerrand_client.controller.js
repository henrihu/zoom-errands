(function ()
{
    'use strict';

    angular
        .module('app.client.myerrand')
        .controller('MyerrandClientController', MyerrandClientController);

    /** @ngInject */
    MyerrandClientController.$inject = ['$log', '$scope', 'Restangular'];
    function MyerrandClientController($log, $scope, Restangular)
    {
        var vm = this; 
        Restangular.all('client/tasks').getList()
        .then(function(tasks) {
            vm.tasks = tasks;
            vm.displayedtasks = [].concat(vm.tasks);
            $log.log(vm.displayedtasks);
        });
    }
})();
