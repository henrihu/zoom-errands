(function ()
{
    'use strict';

    angular
        .module('app.client.timestatus')
        .controller('TimestatusClientController', TimestatusClientController);

    /** @ngInject */
    TimestatusClientController.$inject = ['$log', '$rootScope', 'Restangular', 'toastr'];
    function TimestatusClientController($log, $rootScope, Restangular, toastr)
    {
        // var vm = this;

        // temp vals
        // $rootScope.eh = {
        //     hoursavail: 0,
        //     hoursused: 0,
        //     escrowavail:    0,
        //     escrowused: 0
        // };

        Restangular.one('client/escrowhours').get()
        .then(function(data) {
            $rootScope.eh = data.eh ? data.eh : $rootScope.eh;
        }, function(data){
            // took from other controller, I believe error will be shown same way.
            toastr.warning(data.data.alert);
        });

    }
})();
