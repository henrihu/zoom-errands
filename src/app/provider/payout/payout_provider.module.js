(function ()
{
    'use strict';

    angular
        .module('app.provider.payout', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.provider.payout', {
            url    : '/provider/payout',
            views  : {
                'content@app': {
                    templateUrl: 'app/provider/payout/payout_provider.html',
                    controller : 'PayoutProviderController as vm'
                }
            }
        });
    }

})();
