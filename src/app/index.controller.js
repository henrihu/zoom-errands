(function ()
{
    'use strict';

    angular
        .module('zeyogen')
        .controller('AppController', AppController);

    /** @ngInject */
    AppController.$inject = ['$rootScope', 'Restangular']
    function AppController($rootScope, Restangular)
    {
        var vm = this;

        vm.hompage = false;

        $rootScope.eh = {
            hoursavail: 0,
            hoursused: 0,
            escrowavail: 0,
            escrowused: 0
        };

        // Restangular.one('client/escrowhours').get()
        // .then(function(data) {
        //     $rootScope.eh = data.eh ? data.eh : $rootScope.eh;
        // });

        Restangular.one('provider/setting').get()
        .then(function(resp) {
            vm.available = resp.available;
        });

        vm.clickToggle = function() {
            //update notification setting
            var payload = {available: vm.available};
            Restangular.one('provider/setting').put(payload);      
        }

        // if ($state.is('app.pages_homepage')) {
        //     vm.fixedHeader = true;
        // } else {
        //     vm.fixedHeader = false;
        // }

        //////////

        // $scope.$watch('vm.availableStatus', function() {            
        //     var payload1 = {available: vm.availableStatus};

        //     Restangular.one('provider/setting').put(payload1);    
        // });



       
    }
})();