(function ()
{
    'use strict';

    angular
        .module('app.client.profile')
        .controller('ProfileClientController', ProfileClientController);

    /** @ngInject */
    ProfileClientController.$inject = ['Restangular', 'toastr',
            '$scope', 'uiGmapGoogleMapApi', '$auth', 'FileUploader','API_URL'];
    function ProfileClientController(Restangular, toastr,
            $scope, uiGmapGoogleMapApi, $auth, FileUploader, API_URL)
    {
        var vm = this;       

        // Data
        vm.accountSetting = {};
        vm.uploader = new FileUploader({
                url: API_URL + '/auth',
                queueLimit: 2
        });

        initAccount();

        // Methods
        vm.initAccount = initAccount;
        vm.updateAccount = updateAccount;
        // vm.updatePhoto = updatePhoto;
        vm.triggerFileInput = triggerFileInput;
        
        vm.uploader.onAfterAddingFile = function(item) {
            if (vm.uploader.queue.length !== 1){
                vm.uploader.removeFromQueue(0); // only one file in the queue
            }

            item.alias = 'photo';
            item.method = 'PUT';
            item.headers = $auth.retrieveData('auth_headers');
            item.upload();  
        };

        vm.uploader.onSuccessItem = function(item, response) {
            toastr.success('Your photo has been updated successfully!');
            vm.accountSetting.photoThumbUrl = response.data.photoUrl;
            vm.accountSetting.photoUrl = response.data.photoUrl;
            // console.log(item);
            // console.log(response);
            // console.log(status);
            // console.log(headers);
        };
        
        vm.uploader.onErrorItem = function(item, response) {
            toastr.error(response.errors[0]);
            // console.log(response);
        };

        
        
        //////////
        

        // function define
        function initAccount()
        {  
            vm.accountSetting = $scope.user;
            vm.phone2 = false;
            uiGmapGoogleMapApi.then(function ()
            {
                vm.map = { 
                    center: { latitude: 34.039959, longitude: -118.2693948 }, 
                    zoom: 12 ,
                    coords: { latitude: 34.039959, longitude: -118.2693948 },
                    id: 0
                };
            });    
        }

        /**
         * update client account setting.
         */
        function updateAccount()
        {
            $auth.updateAccount(vm.accountSetting).then(success, error);

            function success(){                 
                toastr.success('Account setting updated successfully!');
            }

            function error(data){

                // if(data.status === 422){

                    angular.forEach(data.alert, function(alert){
                        toastr.error(alert);
                    });

                // }
            }
        }

        

        function triggerFileInput(selectedInput)
        {
            vm.selectedInput = selectedInput;
            angular.element('#imageuploader').trigger('click');          
        }

    }

})();
