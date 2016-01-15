(function ()
{
    'use strict';

    angular
        .module('app.provider.myerrand', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.provider.myerrand', {
            url    : '/provider/myjob',
            views  : {                
                'content@app': {
                    templateUrl: 'app/provider/myerrand/myerrand_provider.html',
                    controller : 'MyerrandProviderController as vm'
                }
            }
        });        
    }

})(); 