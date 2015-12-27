(function ()
{
    'use strict';

    angular
        .module('app.client.dashboard', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.client.dashboard', {
            url    : '/client/dashboard',
            views  : {                
                'content@app': {
                    templateUrl: 'app/client/dashboard/dashboard_client.html',
                    controller : 'DashboardClientController as vm'
                }
            }
        });        
    }

})(); 