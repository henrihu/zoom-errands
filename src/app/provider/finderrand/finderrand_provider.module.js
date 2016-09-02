(function ()
{
    'use strict';

    angular
        .module('app.provider.finderrand', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.provider.finderrand', {
            url    : '/provider/findjob',
            views  : {
                'content@app': {
                    templateUrl: 'app/provider/finderrand/finderrand_provider.html',
                    controller : 'FinderrandProviderController as vm'
                }
            }
        });
    }

})();