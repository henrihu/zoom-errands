(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.login')
        .controller('LoginProviderController', LoginProviderController);

    /** @ngInject */
    LoginProviderController.$inject = ['$state', '$scope'];
    function LoginProviderController($state, $scope)
    {
        var vm = this;
       
        // event handlers
        // event 'auth:login-success'
        $scope.$on('auth:login-success', function(ev, user) 
        {
            toastr.success('Welcome ' + user.email);
            $state.go('app.provider.profile');            
        });

        // event 'auth:login-error'
        $scope.$on('auth:login-error', function(ev, data) 
        {
            return toastr.error(data.errors[0], 'Authentication failure', {timeOut: 7000});            
        });

    }
})();