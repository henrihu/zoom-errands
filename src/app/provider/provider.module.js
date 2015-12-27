(function ()
{
    'use strict';

    angular
        .module('app.provider',
            [
                'app.provider.profile'
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