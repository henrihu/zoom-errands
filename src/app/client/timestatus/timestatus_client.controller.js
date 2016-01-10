(function ()
{
    'use strict';

    angular
        .module('app.client.timestatus')
        .controller('TimestatusClientController', TimestatusClientController);

    /** @ngInject */
    TimestatusClientController.$inject = ['$log', '$scope', 'Restangular', 'toastr'];
    function TimestatusClientController($log, $scope, Restangular, toastr)
    {
        var vm = this;
        console.log('Timestatus controller');

    }
})();
