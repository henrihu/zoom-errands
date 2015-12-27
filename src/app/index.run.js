(function() {
  'use strict';

  angular
    .module('zeyogen')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log,$rootScope, $timeout) {

    // $log.debug('runBlock end');
    $rootScope.$on('$stateChangeStart', function ()
    {
        $rootScope.loadingProgress = true;
    });

    $rootScope.$on('$stateChangeSuccess', function ()
    {
        $timeout(function ()
        {
            $rootScope.loadingProgress = false;
        });
    });

  }

})();
