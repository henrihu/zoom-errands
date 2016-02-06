(function ()
{
    'use strict';

    angular
        .module('app.client.purchase')
        .controller('PurchaseClientController', PurchaseClientController);

    /** @ngInject */
    PurchaseClientController.$inject = ['$log','$window', '$scope', 'Restangular', 'toastr', '$filter'];
    function PurchaseClientController($log, $window, $scope, Restangular, toastr, $filter)
    {
        var vm = this;       

        vm.hour = 2;
        vm.cost = 35;
        vm.escrow = 0;
        vm.fee = {percent: 0, cent: 0};        
        vm.couponPercent = 0;
        vm.coupon = 0;

        Restangular.one('client/escrowhours/fee').get()
        .then(function(data) {
            vm.fee = data.fee;
            vm.proFee = vm.subtotal*vm.fee.percent*0.01 + vm.fee.cent*0.01;
            vm.total = (vm.subtotal + vm.proFee) * (1 - vm.couponPercent*0.01);
        });

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

        $scope.$watch('vm.escrow', function() {
            vm.subtotal = vm.escrow + vm.hour * vm.cost;
        });

        $scope.$watch('vm.subtotal', function() {
            vm.proFee = vm.subtotal*vm.fee.percent*0.01 + vm.fee.cent*0.01;
            vm.total = (vm.subtotal + vm.proFee) * (1 - vm.couponPercent*0.01);
        });

        vm.couponApply = function() {
            if (vm.tmpcoupon) {
                Restangular.one('client/escrowhours/coupon_check').get({'couponCode': vm.tmpcoupon})
                .then(function(resp) {
                    vm.couponPercent = resp.percent;
                    vm.total = (vm.subtotal + vm.proFee) * (1 - vm.couponPercent*0.01); 
                }, function(resp) {
                    vm.couponPercent = 0;
                    vm.total = (vm.subtotal + vm.proFee) * (1 - vm.couponPercent*0.01); 
                    toastr.warning(resp.data.error);
                });
            } else {
                vm.couponPercent = 0;
                vm.total = (vm.subtotal + vm.proFee) * (1 - vm.couponPercent*0.01); 
                toastr.warning("Please input Coupon code correctly.");
            }
            // vm.total = (vm.subtotal + vm.proFee) * (1 - vm.couponPercent*0.01);  
            vm.coupon = vm.tmpcoupon;                      
        };

        // Stripe Response Handler
        $scope.stripeCallback = function (code, result) {
            if (result.error) {
                $window.alert('it failed! error: ' + result.error.message);
            } else {                
                var payload = {stripeEmail: $scope.user.email, stripeToken: result.id, purchaseHour: vm.hour,
                             purchaseEscrow: vm.escrow, couponCode: vm.coupon};
                Restangular.all('client/escrowhours/charge').post(payload)
                .then(function(resp) {
                    toastr.success("Purchase Hour: " + resp.purchaseHour + "hrs" +
                                    "<br/> Fund Escrow: " + $filter("currency")(resp.purchaseEscrow) ,
                                    "You paid " + $filter("currency")(resp.charge.amount*0.01) + " successfully!");
                    $log.log(resp);
                }, function(resp) {
                    toastr.error(resp.data.error);
                    $log.log(resp);
                });
            }
        };

    }
})();
