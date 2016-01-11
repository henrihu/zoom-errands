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

        // temp vals
        vm.eh = {
            hoursavail: 0,
            hoursused: 0,
            escrowavail:	0,
            escrowused: 0
        };

        Restangular.one('client/escrowhours').get()
        .then(function(data) {
            vm.eh = data.eh ? data.eh : vm.eh;
        });

    }
})();
