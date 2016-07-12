(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.login', [])
        // .run(handlerValidation)
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.pages_auth_login', {
            url  : '/pages/auth/login',
            views: {
                'main@'                       : {
                    templateUrl: 'app/main/layouts/ze_layout.html'
                },
                'content@app.pages_auth_login': {
                    templateUrl: 'app/main/pages/auth/login/login.html',
                    controller : 'LoginController as vm'
                }
            }
        }).state('app.pages_auth_login_provider', {
            url  : '/pages/auth/login-provider',
            views: {
                'main@'                       : {
                    templateUrl: 'app/main/layouts/ze_layout.html'
                },
                'content@app.pages_auth_login_provider': {
                    templateUrl: 'app/main/pages/auth/login/login-provider.html',
                    controller : 'LoginProviderController as vm'
                }
            },
            resolve: {
                checkloggedin: function($auth, $state) {
                    $auth.validateUser()
                    .then(function() {
                        $state.go('app.provider.myerrand');
                    });
                }
            }

        });

        
    }

    // event handler 'auth:validation-success' 'auth:validation-error'
    // handlerValidation.$inject = ['$state', '$rootScope'];
    // function handlerValidation($state, $rootScope)
    // {
    //     $rootScope.$on('auth:validation-success', function() {
    //         $state.go('app.pages_profile_client');
    //     });
    // }

})();