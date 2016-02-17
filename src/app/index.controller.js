(function ()
{
    'use strict';

    angular
        .module('zeyogen')
        .controller('AppController', AppController);

    /** @ngInject */
    // AppController.$inject = ['$auth', 'toastr', '$log', '$scope', 'Restangular']
    function AppController()
    {
        var vm = this;

        vm.hompage = false;
        //////////

        // $scope.$watch('vm.availableStatus', function() {            
        //     var payload1 = {available: vm.availableStatus};

        //     Restangular.one('provider/setting').put(payload1);    
        // });

       
    }
})();