(function() {
  'use strict';

  angular
    .module('zeyogen')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
