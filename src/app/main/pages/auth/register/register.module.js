(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.register', [])
        .run(handlerEmailConfirmation)
        .config(config);


    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.pages_auth_register', {
            url  : '/pages/auth/register',
            views: {
                'main@'                          : {
                    templateUrl: 'app/main/layouts/ze_layout.html'
                },
                'content@app.pages_auth_register': {
                    templateUrl: 'app/main/pages/auth/register/register.html',
                    controller : 'RegisterController as vm'
                }
            }
        })
        .state('app.pages_auth_register_provider', {
            url  : '/pages/auth/register-provider',
            views: {
                'main@'                          : {
                    templateUrl: 'app/main/layouts/ze_layout.html'
                },
                'content@app.pages_auth_register_provider': {
                    templateUrl: 'app/main/pages/auth/register/register-provider.html',
                    controller : 'RegisterProviderController as vm' 
                }
            }
        });

        
    }


    handlerEmailConfirmation.$inject = ['$state', '$rootScope', 'toastr'];
    function handlerEmailConfirmation($state, $rootScope, toastr)
    {
        var cleanupfunc1 = $rootScope.$on('auth:oauth-registration', function(ev, user) {
            
            toastr.success('Your account has been successfully created through facebook.', 'Welcome ' + user.email); 
            if (user.configName === 'default') {
                $state.go('app.client.profile');
            }else if (user.configName === 'provider') {
                $state.go('app.provider.profile');
            }
        });

        $rootScope.$on('$destroy', cleanupfunc1);

        // $rootScope.$on('auth:login-success', function(ev, user) {
        //     toastr.success('Welcome ' + user.email); 
        //     console.log(user);
        //     if (user.configName === 'default') {
        //         console.log('me: client');
        //         $state.go('app.client.dashboard');
        //     }else if (user.configName === 'provider') {
        //         console.log('me: provider');
        //         $state.go('app.provider.profile');
        //     }
        // });

        // // event 'auth:login-error'
        // $rootScope.$on('auth:login-error', function(ev, user) 
        // {
        //     return toastr.error(user.errors[0], 'Authentication failure', {timeOut: 7000});            
        // });

        var cleanupfunc2 = $rootScope.$on('auth:email-confirmation-success', function(ev, user) {
            toastr.success('Your account has been successfully created.', 'Welcome ' + user.email);            
            if (user.configName === 'default') {
                $state.go('app.client.profile');
            }else if (user.configName === 'provider') {
                $state.go('app.provider.profile');
            }
            
        });
        $rootScope.$on('$destroy', cleanupfunc2);

        var cleanupfunc3 = $rootScope.$on('auth:email-confirmation-error', function() {
            toastr.error('Request a password reset to verify your identify.', 'Unable to confirm your account.');
        });
        $rootScope.$on('$destroy', cleanupfunc3);

        var cleanupfunc4 = $rootScope.$on('auth:validation-success', function() {
            // $state.go('app.pages_profile_client');
            // console.log(ev);
            // console.log(user);
        });
        $rootScope.$on('$destroy', cleanupfunc4);

        var cleanupfunc5 = $rootScope.$on('auth:validation-error', function() {
            // toastr.wanning('You should log in.')
            // // $state.go('app.pages_auth_login');
            // console.log(ev);
            // console.log(user);
        });
        $rootScope.$on('$destroy', cleanupfunc5);

        var cleanupfunc6 = $rootScope.$on('auth:session-expired', function() {       
            toastr.wanning('Session has expired. Please log in.');
            $state.go('app.pages_auth_login');
        });
        $rootScope.$on('$destroy', cleanupfunc6);

        var cleanupfunc7 = $rootScope.$on('auth:logout-success', function() {
            $state.go('app.pages_homepage');
        }); 
        $rootScope.$on('$destroy', cleanupfunc7);

        var cleanupfunc8 = $rootScope.$on('auth:logout-error', function(ev, reason) {
            toastr.error('logout failed because ' + reason.errors[0]);
        });
        $rootScope.$on('$destroy', cleanupfunc8);
    }

})();
