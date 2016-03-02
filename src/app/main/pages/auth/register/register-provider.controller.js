(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.register')
        .controller('RegisterProviderController', RegisterProviderController);

    /** @ngInject */
    RegisterProviderController.$inject = ['$scope', 'toastr'];
    function RegisterProviderController($scope, toastr)
    {
        var vm = this;

        vm.signupSuccess = false;
        // event handler
        // event: 'auth:registration-email-success'
        $scope.$on('auth:registration-email-success', function() 
        {            
            // toastr.success('A registration email was ' + 'sent to ' + data.email + '<br/>' +
            //     '. follow the instructions contained in the ' + 'email to complete registration.');
            vm.signupSuccess = true;                       
        });

        // event :  'auth:registration-email-error'
        $scope.$on('auth:registration-email-error', function(ev, data) 
        {
            var errors;
            errors = data.errors.full_messages.join('<br/>');
            return toastr.error(errors);            
        });

        // //event   ''auth:email-confirmation-success''
        // $scope.$on('auth:email-confirmation-success', function(ev, user) 
        // {
        //     toastr.success('Your account has been verified.', 'Welcome ' + user.email);
        // });

        // //event 'auth:email-confirmation-error'
        // $scope.$on('auth:email-confirmation-error', function(ev, reason) {
        //     toastr.error('There was an error with your registration.');
        // });
    }
})();