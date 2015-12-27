(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.forgot-password')
        .controller('PasswordChangeProviderController', PasswordChangeProviderController);

    /** @ngInject */
    PasswordChangeProviderController.$inject = ['$scope', '$state'];
    function PasswordChangeProviderController($scope, $state)
    {
        var vm = this;

        //////////  event handlers
        //event 'auth:password-reset-request-success'
        $scope.$on('auth:password-change-success', function() 
        {            
            $state.go('app.provider.profile');
            return toastr.success('Your password has been successfully updated!');
        });

        //event 'auth:password-reset-request-success'
        $scope.$on('auth:password-change-error', function(ev, data) 
        {            
            var str = '', field, 
                errors = data.errors;

            for (field in errors) {
                if (errors.hasOwnProperty(field)){
                    str += errors[field].toString() + '<br/>';                    
                }                
            }
            return toastr.error(str);
        });
    }
})();