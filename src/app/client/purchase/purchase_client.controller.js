(function ()
{
    'use strict';

    angular
        .module('app.client.purchase')
        .controller('PurchaseClientController', PurchaseClientController);

    /** @ngInject */
    PurchaseClientController.$inject = ['$log','$window', '$scope', 'Restangular', 'toastr'];
    function PurchaseClientController($log, $window, $scope, Restangular, toastr)
    {
        var vm = this;

        // temp vals
        vm.eh = {
            hoursavail: 0,
            hoursused: 0,
            escrowavail: 0,
            escrowused: 0
        };

        Restangular.one('client/escrowhours').get()
        .then(function(data) {
            vm.eh = data.eh ? data.eh : vm.eh;
        }, function(data){
            // took from other controller, I believe error will be shown same way.
            toastr.warning(data.data.alert);
        });

        // Stripe Response Handler
        $scope.stripeCallback = function (code, result) {
            if (result.error) {
                $window.alert('it failed! error: ' + result.error.message);
            } else {                
                var payload = {stripeEmail: $scope.user.email, stripeToken: result.id};
                Restangular.all('client/escrowhours/charge').post(payload)
                .then(function(resp) {
                    $log.log(resp);
                }, function(resp) {
                    $log.log(resp);
                });
            }
        };

    }
})();
