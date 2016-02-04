(function ()
{
    'use strict';

    angular
        .module('app.client',
            [
                'app.client.profile',
                'app.client.myerrand',
                'app.client.dashboard',
                'app.client.editerrand',
                'app.client.timestatus',
                'app.client.purchase'
            ])
        .config(config);

    /** @ngInject */
    config.$inject = ['$stateProvider'];
    function config($stateProvider)
    {
        $stateProvider.state('app.client', { 
                   
            resolve: {
                auth: function($auth) {
                    return $auth.validateUser();
                }                
            }
        });
       

    }    
})();