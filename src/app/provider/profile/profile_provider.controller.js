(function ()
{
    'use strict';

    angular
        .module('app.provider.profile')
        .controller('ProfileProviderController', ProfileProviderController);

    /** @ngInject */
    ProfileProviderController.$inject = ['Restangular', '$mdDialog',
            '$scope', 'uiGmapGoogleMapApi', '$auth', 'FileUploader','API_URL', '$state' ];
    function ProfileProviderController(Restangular, $mdDialog,
            $scope, uiGmapGoogleMapApi, $auth, FileUploader, API_URL, $state)
    {
        var vm = this;    

        // console.log($scope.user.configName);
        // Data                       

        initAccount();

        // Methods
        vm.initAccount = initAccount;        
        vm.showAdvanced = showAdvanced;
        vm.triggerFileInput = triggerFileInput;
        vm.updateAccount = updateAccount;
        vm.itemArray = [
            {id: 1, name: 'asd'},
            {id: 2, name: 'fdasd'},
            {id: 3, name: 'asasd'},
            {id: 4, name: 'asasd'},
            {id: 5, name: 'assd'}
        ];
        vm.availableColors = ['red','blue', 'ced','asdf'];


                // function define
        function initAccount()
        {   
            // console.log($scope.user);
            vm.accountSetting = {};
            vm.agreement = {};
            vm.agreement.al099 = vm.agreement.confidentiality = vm.agreement.delivery = vm.agreement.noncompete = '';
            vm.uploader = new FileUploader({
                    url: API_URL + '/provider_auth',
                    queueLimit: 2
            });

            vm.accountSetting = $scope.user;
            
            Restangular.one('provider/setting').get()
            .then(function(resp) {
                vm.agreement = resp; 
            });

            // Get provider job types
            Restangular.one('provider/types').get()
            .then(function(resp) {
                vm.types = resp.types;
            });
            
            uiGmapGoogleMapApi.then(function (maps)
            {
                vm.map = { 
                    center: { latitude: 34.039959, longitude: -118.2693948 }, 
                    zoom: 12 ,
                    coords: { latitude: 34.039959, longitude: -118.2693948 },
                    id: 0
                };
            });  

            // vm.states = [
            //   {name: 'Alaska', abb: 'AK'}, {name: 'Alabama', abb: 'AL'}, {name: 'Arkansas', abb: 'AR'}, {name: 'Arizona', abb: 'AZ'},
            //   {name: 'California', abb: 'CA'}, {name: 'Colorado', abb: 'CO'}, {name: 'Connecticut', abb: 'CT'}, {name: 'District of Columbia', abb: 'DC'},
            //   {name: 'Delaware', abb: 'DE'}, {name: 'Florida', abb: 'FL'}, {name: 'Georgia', abb: 'GA'}, {name: 'Hawaii', abb: 'HI'}, {name: 'Iowa', abb: 'IA'},
            //   {name: 'Idaho', abb: 'ID'}, {name: 'Illinois', abb: 'IL'}, {name: 'Indiana', abb: 'IN'}, {name: 'Kansas', abb: 'KS'}, {name: 'Kentucky', abb: 'KY'},
            //   {name: 'Louisiana', abb: 'LA'}, {name: 'Massachusetts', abb: 'MA'}, {name: 'Maryland', abb: 'MD'}, {name: 'Maine', abb: 'ME'}, {name: 'Michigan', abb: 'MI'},
            //   {name: 'Minnesota', abb: 'MN'}, {name: 'Missouri', abb: 'MO'}, {name: 'Mississippi', abb: 'MS'}, {name: 'Montana', abb: 'MT'}, {name: 'North Carolina', abb: 'NC'},
            //   {name: 'North Dakota', abb: 'ND'}, {name: 'Nebraska', abb: 'NE'}, {name: 'New Hampshire', abb: 'NH'}, {name: 'New Jersey', abb: 'NJ'},
            //   {name: 'New Mexico', abb: 'NM'}, {name: 'Nevada', abb: 'NV'}, {name: 'New York', abb: 'NY'}, {name: 'Ohio', abb: 'OH'}, {name: 'Oklahoma', abb: 'OK'},
            //   {name: 'Oregon', abb: 'OR'}, {name: 'Pennsylvania', abb: 'PA'}, {name: 'Rhode Island', abb: 'RI'}, {name: 'South Carolina', abb: 'SC'}, {name: 'South Dakota', abb: 'SD'},
            //   {name: 'Tennessee', abb: 'TN'}, {name: 'Texas', abb: 'TX'}, {name: 'Utah', abb: 'UT'}, {name: 'Virginia', abb: 'VA'}, {name: 'Vermont', abb: 'VT'},
            //   {name: 'Washington', abb: 'WA'}, {name: 'Wisconsin', abb: 'WI'}, {name: 'West Virginia', abb: 'WV'}, {name: 'Wyoming', abb: 'WY'}
            // ];

            vm.states = [
              'AK', 'AL', 'AR', 'AZ',
              'CA', 'CO', 'CT', 'DC',
              'DE','FL', 'GA','HI', 'IA',
              'ID','IL','IN','KS','KY',
              'LA','MA','MD','ME','MI',
              'MN','MO','MS','MT','NC',
              'ND','NE','NH','NJ',
              'NM','NV','NY','OH','OK',
              'OR','PA','RI','SC','SD',
              'TN','TX','UT','VA','VT',
              'WA','WI','WV','WY'
            ];

            $scope.itemArray = [
                {id: 1, name: 'first'},
                {id: 2, name: 'second'},
                {id: 3, name: 'third'},
                {id: 4, name: 'fourth'},
                {id: 5, name: 'fifth'},
            ];

            $scope.selectedItem= $scope.itemArray[0];
        }
        
        function showAdvanced(ev, dialogID)
        {
            var templateDialog = 'app/provider/profile/tabs/account/dialog.' + dialogID + '.html';
            $mdDialog.show({
                controller         : function ($scope, $mdDialog)
                {                    
                    if (vm.accountSetting.fname && vm.accountSetting.lname) {
                        $scope.fullName = vm.accountSetting.fname + ' ' + vm.accountSetting.lname;
                    }
                    else {
                        $scope.fullName = '';
                    }
                    
                    console.log('vm', vm);
                    if (vm.agreement) {
                        switch ( dialogID )
                        {
                            case '1099':
                                $scope.signedAt = vm.agreement.a1099;
                                break;

                            case 'confidentiality':
                                $scope.signedAt = vm.agreement.confidentiality;
                                break;

                            case 'delivery':
                                $scope.signedAt = vm.agreement.confidentiality;
                                break;

                            case 'noncompete':
                                $scope.signedAt = vm.agreement.noncompete;
                                break;

                            default:
                                $scope.signedAt = '';
                        }
                    }

                    $scope.hide = function ()
                    {
                        $mdDialog.hide();
                    };

                    $scope.cancel = function ()
                    {
                        $mdDialog.cancel();
                    };

                    $scope.agree = function ()
                    {
                        var payload = {agreement: dialogID, fullname: $scope.fullName};
                        Restangular.one('provider/setting').put(payload).then(function(resp) {
                            $scope.signedAt = resp.time;                            
                            toastr.success('You signed ' + dialogID + ' agreement at ' + resp.time , 'Thank you!');
                        }, function errorCallback(resp){
                            toastr.error(resp.data.error);
                        });                        
                    };
                },
                templateUrl        : templateDialog,
                parent             : angular.element(document.body),
                // scope              : $scope,
                targetEvent        : ev,
                clickOutsideToClose: true
            })
                .then(function (answer)
                {
                    vm.alert = 'You said the information was "' + answer + '".';
                }, function ()
                {
                    vm.alert = 'You cancelled the dialog.';
                });
        }

        //////////
        function triggerFileInput(selectedInput)
        {
            vm.selectedInput = selectedInput;
            $('#imageuploader').trigger('click');          
        }

        vm.uploader.onAfterAddingFile = function(item) {
            if (vm.uploader.queue.length !== 1){
                vm.uploader.removeFromQueue(0); // only one file in the queue
            }
            
            item.method = 'PUT';
            item.headers = $auth.retrieveData('auth_headers');            
            item.alias = vm.selectedInput;
            item.upload();
        };

        vm.uploader.onSuccessItem = function(item, response, status, headers) {
            switch ( vm.selectedInput )
            {
                case 'photo':
                    toastr.success('Your photo has been updated successfully!');
                    $scope.user.photoUrl = response.data.photoUrl;
                    $scope.user.photo_file_name = true;    
                    break;

                case 'driverlicense':
                    toastr.success('Your Drivers License has been updated successfully!');
                    $scope.user.driverUrl = response.data.driverUrl;
                    $scope.user.driverlicense_file_name = true;    
                    break;

                case 'proofinsurance':
                    toastr.success('Your Proof Insurance has been updated successfully!');
                    $scope.user.proofUrl = response.data.proofUrl;
                    $scope.user.proofinsurance_file_name = true;    
                    break;
                
            }
            
                  
        };
        
        vm.uploader.onErrorItem = function(item, response, status, headers) {
            toastr.error(response.errors[0]);
            // console.log(response);
        };        
        
        /**
         * update client account setting.
         */
        function updateAccount()
        {
            // update main accountSetting
            $auth.updateAccount(vm.accountSetting, {config: 'provider'}).then(success, error);
            
            // update job types
            var payload = [];
            for (var i in vm.types)
            {
                if (vm.types[i])
                {
                    payload.push(vm.types[i].value);                    
                }
            }
            Restangular.one('provider/types').put(payload);
            // .then(function(resp) {
            //     toastr.success(resp.message);
            // }, function errorCallback(resp){
            //         console.log(resp);
            //         // toastr.error(resp);
            // });
            
            //update notification setting
            var payload1 = {sms: vm.agreement.sms, email: vm.agreement.email};            

            Restangular.one('provider/setting').put(payload1);
            // .then(function(resp) {
            //     toastr.success(resp.message);
            // });


            function success(){                 
                toastr.success('Account setting updated successfully!');
            }

            function error(data){              

                    angular.forEach(data.alert, function(alert){
                        toastr.error(alert);
                    });
            }
        }

    }

})();
