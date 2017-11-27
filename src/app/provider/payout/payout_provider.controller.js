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
      var vm = this;
      vm.loadMore = loadMore;
      vm.limit = 7;
      vm.curPos = 0;

      Restangular.one('provider/tasks/get_pay_out').get({'limit': vm.limit, 'offset': vm.curPos})
      .then(function(resp) {

      });

      function loadMore()
      {
          Restangular.one('provider/tasks/get_pay_out').get({'limit': vm.limit, 'offset': vm.curPos})
          .then(function(resp) {
              alert("hellosadasdasd")
          });
      }

    }
})();
