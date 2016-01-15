(function ()
{
    'use strict';

    angular
        .module('app.provider.profile', ['ngDialog'])
        .config(config);


    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.provider.profile', {
            url    : '/provider/profile',
            views  : {                 

                'content@app': {
                    templateUrl: 'app/provider/profile/profile_provider.html',
                    controller : 'ProfileProviderController as vm'
                }

            }
        });

        

    }

})();