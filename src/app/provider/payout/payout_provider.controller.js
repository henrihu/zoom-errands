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
      vm.tipsAmount = 0;
      vm.earningAmount = 0;
      vm.penaltiesAmount = 0;
      vm.total_amount = 0;
      vm.taskId = [];
      getPayout();

      function getPayout() {
        Restangular.one('provider/tasks/get_pay_out').get({}).then(function(resp) {
          vm.earningAmount = resp.earning_amount
          vm.tipsAmount = resp.tips_amount
          vm.penaltiesAmount = resp.penalties_amount
          vm.total_amount = resp.tips_amount
          vm.taskId = resp.task_id
        })
      }

      vm.createPayout = function (){
        var params;
        params = {total_amount: vm.total_amount, total_tips: vm.tipsAmount,
         total_penalities: vm.penaltiesAmount, task_id: vm.taskId}
        Restangular.one('provider/tasks/create_pay_out').customPOST({payout: params}).then(function(resp) {
          getPayout();
        })
      }
    }
})();
