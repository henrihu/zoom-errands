(function ()
{
    'use strict';

    angular
        .module('app.provider',
            [
                'app.provider.profile',
                'app.provider.myerrand',
                'app.provider.finderrand',
                'app.provider.editerrand',
                'app.provider.payout'
            ])
        .config(config);

    /** @ngInject */
    config.$inject = ['$stateProvider'];
    function config($stateProvider)
    {
        $stateProvider.state('app.provider', {
            resolve: {
                auth: function($auth) {
                    return $auth.validateUser({config: 'provider'});
                }
            }
        });
    }
})();
