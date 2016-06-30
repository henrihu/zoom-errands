(function ()
{
    'use strict';

    angular
        .module('app.provider.editerrand', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.provider.editerrand', {
            url    : '/provider/editjob?id',
            views  : {                
                'content@app': {
                    templateUrl: 'app/provider/editerrand/editerrand_provider.html',
                    controller : 'EditerrandProviderController as vm'
                }
            }
        });        
    }

})(); 