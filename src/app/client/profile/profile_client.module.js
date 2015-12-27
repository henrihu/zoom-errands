(function ()
{
    'use strict';

    angular
        .module('app.client.profile', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.client.profile', {
            url    : '/client/profile',
            views  : {
                // 'main@'        : {
                //     templateUrl: 'app/main/layouts/ze_layout.html'
                // },
                // 'header-toolbar@app.pages_profile_client': {
                //     templateUrl: 'app/toolbar/header-toolbar.html',
                //     controller : 'HeaderToolbarController as vm'
                // },
                'content@app': {
                    templateUrl: 'app/client/profile/profile_client.html',
                    controller : 'ProfileClientController as vm'
                }

            },
            resolve: {
                // auth: function($auth) {
                //     return $auth.validateUser();
                // }
                // AccountSetting : function(profileClientService)
                // {
                //     // return profileClientService.getAccountSetting();
                // },
                // TestResolve : function(profileClientService) 
                // {
                //     profileClientService.getTest().then(function(test) {
                //         return test.message;
                //     });
                // }  

            }
        });

        

    }

})();