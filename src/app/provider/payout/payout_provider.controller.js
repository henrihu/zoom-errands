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

      function getPayout() {
        Restangular.one('provider/tasks/get_pay_out').get({}).then(function(resp) {
          vm.earningAmount = resp.earning_amount
          vm.tipsAmount = resp.tips_amount
        })
      }

      vm.createPayout = function (earningAmount, totalTips){
        var params;
        params = {earning_amount: earningAmount, total_tips: totalTips}
        Restangular.one('provider/tasks/create_pay_out').customPOST({payout: params}).then(function(resp) {
          getPayout();
        })
      }
    }
})();
