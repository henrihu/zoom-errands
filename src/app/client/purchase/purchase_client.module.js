(function ()
{
    'use strict';

    angular
        .module('app.client.purchase', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.client.purchase', {
            url    : '/client/purchase',
            views  : {                
                'content@app': {
                    templateUrl: 'app/client/purchase/purchase_client.html',
                    controller : 'PurchaseClientController as vm'
                },
                'navbar@app'    : {
                  templateUrl: 'app/main/layouts/navbar.html',
                  controller : 'PurchaseClientController as vm'
              }  
            }
        });        
    }

})(); 