(function ()
{
    'use strict';

    angular
        .module('app.provider.payout')
        .controller('PayoutProviderController', PayoutProviderController);

    /** @ngInject */
    PayoutProviderController.$inject = ['$state', '$log', 'API_URL', '$scope', 'Restangular', '$stateParams', 'toastr', 'FileUploader', '$auth'];
    function PayoutProviderController($state, $log, API_URL, $scope, Restangular, $stateParams, toastr, FileUploader, $auth)
    {

    }
})();
