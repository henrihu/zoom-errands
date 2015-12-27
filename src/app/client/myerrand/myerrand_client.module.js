(function ()
{
    'use strict';

    angular
        .module('app.client.myerrand', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.client.myerrand', {
            url    : '/client/myerrand',
            views  : {                
                'content@app': {
                    templateUrl: 'app/client/myerrand/myerrand_client.html',
                    controller : 'MyerrandClientController as vm'
                }
            }
        });        
    }

})(); 