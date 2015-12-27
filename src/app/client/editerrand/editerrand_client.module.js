(function ()
{
    'use strict';

    angular
        .module('app.client.editerrand', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.client.editerrand', {
            url    : '/client/editerrand?id',
            views  : {                
                'content@app': {
                    templateUrl: 'app/client/editerrand/editerrand_client.html',
                    controller : 'EditerrandClientController as vm'
                }
            }
        });        
    }

})(); 