(function ()
{
    'use strict';

    angular
        .module('app.client.purchase')
        .controller('PurchaseClientController', PurchaseClientController);

    /** @ngInject */
    PurchaseClientController.$inject = ['$rootScope', '$log','$window', '$scope', 'Restangular', 'toastr', '$filter'];
    function PurchaseClientController($rootScope, $log, $window, $scope, Restangular, toastr, $filter)
    {
        var vm = this;

        vm.waiting = false;
        vm.hour = 0;
        vm.escrow = 0;
        vm.fee = {percent: 0, cent: 0};        
        vm.couponPercent = 0;
        vm.coupon = 0;
        vm.showDropdown = false;
        vm.dropBtnText = '1 hour';
        vm.dropPriceText = 32;
        vm.hoursPrice = 32;
        vm.otherPayment = 0;

        Restangular.one('client/escrowhours/fee').get()
        .then(function(data) {
            vm.fee = data.fee;
            vm.proFee = vm.escrow*vm.fee.percent*0.01 + vm.fee.cent*0.01;
            vm.total = vm.subtotal + vm.proFee + vm.otherPayment;
        });

        $scope.$watch('vm.hour', function() {
            vm.subtotal = vm.escrow + vm.hoursPrice * (1 - vm.couponPercent*0.01);
            vm.total = vm.subtotal + vm.proFee + vm.otherPayment;
        });

        $scope.$watch('vm.escrow', function() {
            vm.subtotal = vm.escrow + vm.hoursPrice * (1 - vm.couponPercent*0.01);
            vm.proFee = vm.escrow*vm.fee.percent*0.01 + vm.fee.cent*0.01;
            vm.total = vm.subtotal + vm.proFee + vm.otherPayment;
        });

        vm.changeOtherPayment = function() {
            vm.total = vm.subtotal + vm.proFee + vm.otherPayment;
        }

        // $scope.$watch('vm.subtotal', function() {
        //     vm.proFee = vm.subtotal*vm.fee.percent*0.01 + vm.fee.cent*0.01;
        //     vm.total = (vm.subtotal + vm.proFee) * (1 - vm.couponPercent*0.01);
        // });
        

        vm.setHours = function(h) {
            vm.hour = h;
            vm.hoursPrice = vm.calcPrice(vm.hour)
            
            if (h < 5 && h >=1) {
                vm.dropBtnText = h + ' ' + (h == 1 ? 'hour' : 'hours');
                vm.dropPriceText = vm.calcPrice(vm.hour)
                vm.showDropdown = false;
            }
        }

        vm.calcPrice = function(h) {
            var hoursPrice;
            if (h >= 40) {
                hoursPrice = h * 25
            } else if (h >=30) {
                hoursPrice = h * 26
            } else if (h >=20) {
                hoursPrice = h * 26.75
            } else if (h >=10) {
                hoursPrice = h * 27.5                
            } else if (h >=5) {
                hoursPrice = h * 29                
            } else if (h >=1) {
                hoursPrice = h * 32                
            } else if (h >=0) {
                hoursPrice = h * 32                
            } 

            return hoursPrice;
        }

        vm.couponApply = function() {
            if (vm.tmpcoupon) {
                Restangular.one('client/escrowhours/coupon_check').get({'couponCode': vm.tmpcoupon})
                .then(function(resp) {
                    vm.couponPercent = resp.percent;
                    vm.subtotal = vm.escrow + vm.hoursPrice * (1 - vm.couponPercent*0.01);
                    vm.total = (vm.subtotal + vm.proFee + vm.otherPayment); 
                }, function(resp) {
                    vm.couponPercent = 0;
                    vm.subtotal = vm.escrow + vm.hoursPrice * (1 - vm.couponPercent*0.01);
                    vm.total = (vm.subtotal + vm.proFee +vm.otherPayment); 
                    toastr.warning(resp.data.error);
                });
            } else {
                vm.couponPercent = 0;
                vm.subtotal = vm.escrow + vm.hoursPrice * (1 - vm.couponPercent*0.01);
                vm.total = (vm.subtotal + vm.proFee + vm.otherPayment); 
                toastr.warning("Please input Coupon code correctly.");
            }
            // vm.total = (vm.subtotal + vm.proFee) * (1 - vm.couponPercent*0.01);  
            vm.coupon = vm.tmpcoupon;                      
        };

        vm.couponCancel = function() {
            vm.coupon = "";
            vm.couponPercent = 0;
            vm.subtotal = vm.escrow + vm.hoursPrice * (1 - vm.couponPercent*0.01);
            vm.total = (vm.subtotal + vm.proFee + vm.otherPayment); 
        }

        vm.cancelSubmit = function() {
            vm.waiting = false;
            vm.hour = 0;
            vm.escrow = 0;
            vm.couponPercent = 0;
            vm.coupon = 0;
            vm.showDropdown = false;
            vm.dropBtnText = '1 hour';
            vm.dropPriceText = 32;
            vm.hoursPrice = 0;
            vm.otherPayment = 0;
        }

        // Stripe Response Handler
        $scope.stripeCallback = function (code, result) {
            if (result.error) {
                $window.alert('it failed! error: ' + result.error.message);
            } else { 
                vm.waiting = true;               
                var payload = {stripeEmail: $scope.user.email, stripeToken: result.id, purchaseHour: vm.hour,
                             purchaseEscrow: vm.escrow, couponCode: vm.coupon, otherPayment: vm.otherPayment};
                Restangular.all('client/escrowhours/charge').post(payload)
                .then(function(resp) {
                    vm.waiting = false;
                    toastr.success("Purchase Hour: " + resp.purchaseHour + "hrs" +
                                    "<br/> Fund Escrow: " + $filter("currency")(resp.purchaseEscrow) ,
                                    "You paid " + $filter("currency")(resp.charge.amount*0.01) + " successfully!");
                    Restangular.one('client/escrowhours').get()
                    .then(function(data) {
                        $rootScope.eh = data.eh ? data.eh : $rootScope.eh;
                    }, function(data){
                        // took from other controller, I believe error will be shown same way.
                        toastr.warning(data.data.alert);
                    });
                }, function(resp) {
                    vm.waiting = false;
                    toastr.error(resp.data.error);
                    $log.log(resp);
                });
            }
        };



    }
})();
