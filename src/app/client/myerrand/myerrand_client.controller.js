(function ()
{
    'use strict';

    angular
        .module('app.client.myerrand')
        .controller('MyerrandClientController', MyerrandClientController);

    /** @ngInject */
    MyerrandClientController.$inject = [ '$scope', 'Restangular'];
    function MyerrandClientController($scope, Restangular)
    {
        var vm = this; 
        Restangular.all('client/tasks').getList()
        .then(function(tasks) {
            vm.tasks = tasks;
            console.log('tasks', tasks);
        });
    }
})();
