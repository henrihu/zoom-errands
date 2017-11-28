(function ()
{
    'use strict';

    angular
        .module('app.provider.payout')
        .controller('PayoutProviderController', PayoutProviderController);

    /** @ngInject */
    PayoutProviderController.$inject = ['$state', '$log', 'API_URL', '$scope', 'Restangular', '$stateParams', 'toastr', 'FileUploader', '$auth'];
    function PayoutProviderController($state, $log, API_URL, $scope, Restangular, $stateParams, $root, toastr, FileUploader, $auth)
    {
      var vm = this;
      vm.limit = 7;
      vm.curPos = 0;

      getPayout();

      vm.createPayout = function (){
        $scope.$root.createPayouts(vm.earningAmount, vm.tipsAmount).then(function(res){
          getPayout();
        })
      }

      function getPayout() {
        Restangular.one('provider/tasks/get_pay_out').get({}).then(function(resp) {
          vm.earningAmount = resp.earning_amount
          vm.tipsAmount = resp.tips_amount
        })
      }
    }
})();
