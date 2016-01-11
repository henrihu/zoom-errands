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
            hoursavail: 33,
            hoursused: -56,
            escrowavail:	265.92,
            escrowused: -47.89
        };

        Restangular.one('client/escrowhours').get()
        .then(function(data) {
            vm.eh = data.eh ? data.eh : vm.eh;
            $log.log(data);
        });

    }
})();
