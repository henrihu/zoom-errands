(function ()
{
    'use strict';

    angular
        .module('app.client.timestatus', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.client.timestatus', {
            url    : '/client/timestatus',
            views  : {                
                'content@app': {
                    templateUrl: 'app/client/timestatus/timestatus_client.html',
                    controller : 'TimestatusClientController as vm'
                }
            }
        });        
    }

})(); 