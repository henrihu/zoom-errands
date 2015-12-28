(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.forgot-password', [])
        .run(handlerPasswordResetConfirm)
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.pages_auth_forgot-password', {
            url  : '/pages/auth/forgot-password',
            views: {
                'main@'                                 : {
                    templateUrl: 'app/main/layouts/ze_layout.html'
                },
                'content@app.pages_auth_forgot-password': {
                    templateUrl: 'app/main/pages/auth/forgot-password/forgot-password.html',
                    controller : 'ForgotPasswordController as vm'
                }
            }
        }).state('app.pages_auth_password-change', {
            url  : '/pages/auth/password-change',
            views: {
                'main@'                                 : {
                    templateUrl: 'app/main/layouts/ze_layout.html'
                },
                'content@app.pages_auth_password-change': {
                    templateUrl: 'app/main/pages/auth/forgot-password/password-change.html',
                    controller : 'PasswordChangeController as vm'
                }
            }
        }).state('app.pages_auth_forgot-password_provider', {
            url  : '/pages/auth/forgot-password-provider',
            views: {
                'main@'                                 : {
                    templateUrl: 'app/main/layouts/ze_layout.html'
                },
                'content@app.pages_auth_forgot-password_provider': {
                    templateUrl: 'app/main/pages/auth/forgot-password/forgot-password-provider.html',
                    controller : 'ForgotPasswordProviderController as vm'
                }
            }
        }).state('app.pages_auth_password-change_provider', {
            url  : '/pages/auth/password-change-provider',
            views: {
                'main@'                                 : {
                    templateUrl: 'app/main/layouts/ze_layout.html'
                },
                'content@app.pages_auth_password-change_provider': {
                    templateUrl: 'app/main/pages/auth/forgot-password/password-change-provider.html',
                    controller : 'PasswordChangeProviderController as vm'
                }
            }
        });

        
    }

    handlerPasswordResetConfirm.$inject = ['$rootScope', '$state', 'toastr'];
    function handlerPasswordResetConfirm($rootScope, $state, toastr)
    {
        var deregistrationCallback = $rootScope.$on('auth:password-reset-confirm-success', function(ev, data) {
            if (data.configName === 'default') {
                $state.go('app.pages_auth_password-change');
            }else if (data.configName === 'provider') {
                $state.go('app.pages_auth_password-change_provider');
            }
            
        });

        $rootScope.$on('$destroy', deregistrationCallback);

        var deregistrationCallback1 = $rootScope.$on('auth:password-reset-confirm-error', function(ev, data) {
            toastr.error(data.errors.toString());
        });

        $rootScope.$on('$destroy', deregistrationCallback1);

    }

})();