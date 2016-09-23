(function ()
{
    'use strict';

    angular
        .module('app.provider.profile')
        .controller('ProfileProviderController', ProfileProviderController);

    /** @ngInect */
    ProfileProviderController.$inject = ['$log', 'Restangular', 'toastr',
            '$auth', 'FileUploader','API_URL', 'ngDialog', '$scope'];
    function ProfileProviderController($log, Restangular, toastr,
            $auth, FileUploader, API_URL, ngDialog, $scope)
    {
        var vm = this;


        initAccount();

        // Methods
        vm.initAccount = initAccount;
        vm.show1099 = show1099;
        vm.agree1099 = agree1099;
        vm.showConfidentiality = showConfidentiality;
        vm.agreeConfidentiality = agreeConfidentiality;
        vm.showNoncompete = showNoncompete;
        vm.agreeNoncompete = agreeNoncompete;
        vm.showDelivery = showDelivery;
        vm.agreeDelivery = agreeDelivery;
        vm.triggerFileInput = triggerFileInput;
        vm.updateAccount = updateAccount;


        vm.autocompleteOptions = {
            componentRestrictions: { country: 'us' },
            types: ['geocode']
        }

                // function define
        function initAccount()
        {
            // vm.accountSetting = {};
            vm.accountSetting = $scope.user;
            vm.addr = vm.accountSetting.address1;

            if (vm.accountSetting.fname && vm.accountSetting.lname) {
                vm.fullName = vm.accountSetting.fname + ' ' + vm.accountSetting.lname;
            }
            else {
                vm.fullName = '';
            }
            vm.agreement = {};
            vm.agreement.al099 = vm.agreement.confidentiality = vm.agreement.delivery = vm.agreement.noncompete = '';
            vm.uploader = new FileUploader({
                    url: API_URL + '/provider_auth',
                    queueLimit: 2
            });


            Restangular.one('server_setting').get()
            .then(function(resp) {
                vm.server_setting = resp;
            });

            Restangular.one('provider/setting').get()
            .then(function(resp) {
                vm.agreement = resp;
            });

            // Get provider job types
            Restangular.one('provider/types').get()
            .then(function(resp) {
                vm.types = resp.types;
            });

            Restangular.all('client/zoomoffices').getList()
            .then(function(offices) {
                // $log.log(types);
                vm.zoomoffices = offices;
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

            vm.itemArray = [
                {id: 1, name: 'first'},
                {id: 2, name: 'second'},
                {id: 3, name: 'third'},
                {id: 4, name: 'fourth'},
                {id: 5, name: 'fifth'}
            ];

            vm.selectedItem= vm.itemArray[0];
        }

        /*
          **** 1099 Check
         */
        function show1099()
        {
            if (!vm.accountSetting.fname || !vm.accountSetting.lname) {
                toastr.error('Please enter your first name and last name');
                return;
            }
            ngDialog.open({
                // className: 'ngdialog-theme-plain custom-width',
                controller: 'ProfileProviderController as vm',
                template: 'app/provider/profile/tabs/account/dialog-b.1099.html'
            });
        }

        function agree1099 () {
            if ((vm.accountSetting.fname || '') + ' ' + (vm.accountSetting.lname || '') != vm.fullName) {
                toastr.error('Please enter your full name');
                return;
            }
            var dialogID = '1099';
            var payload = {'agreement': dialogID, 'fullname': vm.fullName};
            Restangular.one('provider/setting').put(payload).then(function(resp) {
                //vm.signedAt = resp.time;
                vm.agreement.a1099 = resp.time;
                toastr.success('You signed ' + dialogID + ' agreement at ' + resp.time , 'Thank you!');
            }, function errorCallback(resp){
                toastr.error(resp.data.error);
            });
        }


        /*
         **** Confidentiality
         */
        function showConfidentiality()
        {
            if (!vm.accountSetting.fname || !vm.accountSetting.lname) {
                toastr.error('Please enter your first name and last name');
                return;
            }
            ngDialog.open({
                // className: 'ngdialog-theme-plain custom-width',
                controller: 'ProfileProviderController as vm',
                template: 'app/provider/profile/tabs/account/dialog-b.confidentiality.html'
            });
        }

        function agreeConfidentiality() {
            if ((vm.accountSetting.fname || '') + ' ' + (vm.accountSetting.lname || '') != vm.fullName) {
                toastr.error('Please enter your full name');
                return;
            }
            var dialogID = 'confidentiality';
            var payload = {'agreement': dialogID, 'fullname': vm.fullName};
            Restangular.one('provider/setting').put(payload).then(function(resp) {
                //vm.signedAt = resp.time;
                vm.agreement.confidentiality = resp.time;
                toastr.success('You signed ' + dialogID + ' agreement at ' + resp.time , 'Thank you!');
            }, function errorCallback(resp){
                toastr.error(resp.data.error);
            });
        }

        /*
           **** Noncompete
         */
        function showNoncompete()
        {
            if (!vm.accountSetting.fname || !vm.accountSetting.lname) {
                toastr.error('Please enter your first name and last name');
                return;
            }
            ngDialog.open({
                // className: 'ngdialog-theme-plain custom-width',
                controller: 'ProfileProviderController as vm',
                template: 'app/provider/profile/tabs/account/dialog-b.noncompete.html'
            });
        }

        function agreeNoncompete() {
            if ((vm.accountSetting.fname || '') + ' ' + (vm.accountSetting.lname || '') != vm.fullName) {
                toastr.error('Please enter your full name');
                return;
            }
            var dialogID = 'noncompete';
            var payload = {'agreement': dialogID, 'fullname': vm.fullName};
            Restangular.one('provider/setting').put(payload).then(function(resp) {
                //vm.signedAt = resp.time;
                vm.agreement.noncompete = resp.time;
                toastr.success('You signed ' + dialogID + ' agreement at ' + resp.time , 'Thank you!');
            }, function errorCallback(resp){
                toastr.error(resp.data.error);
            });
        }

        /*
           **** Delivery
         */
        function showDelivery()
        {
            if (!vm.accountSetting.fname || !vm.accountSetting.lname) {
                toastr.error('Please enter your first name and last name');
                return;
            }
            ngDialog.open({
                // className: 'ngdialog-theme-plain custom-width',
                controller: 'ProfileProviderController as vm',
                template: 'app/provider/profile/tabs/account/dialog-b.delivery.html'
            });
        }

        function agreeDelivery() {
            if ((vm.accountSetting.fname || '') + ' ' + (vm.accountSetting.lname || '') != vm.fullName) {
                toastr.error('Please enter your full name');
                return
            }
            var dialogID = 'delivery';
            var payload = {'agreement': dialogID, 'fullname': vm.fullName};
            var po = 'OK';
            Restangular.one('provider/setting').put(payload).then(function(resp) {
                //vm.signedAt = resp.time;
                vm.agreement.delivery = resp.time;
                $log.log(po);
                toastr.success('You signed ' + dialogID + ' agreement at ' + resp.time , 'Thank you!');
            }, function errorCallback(resp){
                toastr.error(resp.data.error);
            });
        }

        //////////
        function triggerFileInput(selectedInput)
        {
            vm.selectedInput = selectedInput;
            angular.element('#imageuploader').trigger('click');
        }

        vm.uploader.onAfterAddingFile = function(item) {
            if (vm.uploader.queue.length !== 1){
                vm.uploader.removeFromQueue(0); // only one file in the queue
            }

            item.method = 'PUT';
            item.headers = $auth.retrieveData($auth.getConfig().keyAuthHeader);
            item.alias = vm.selectedInput;
            item.upload();
        };

        vm.uploader.onSuccessItem = function(item, response) {
            switch ( vm.selectedInput )
            {
                case 'photo':
                    toastr.success('Your photo has been updated successfully!');
                    vm.accountSetting.photoUrl = response.data.photoUrl;
                    vm.accountSetting.photoThumbUrl = response.data.photoUrl;
                    vm.accountSetting.photo_file_name = true;
                    break;

                case 'driverlicense':
                    toastr.success('Your Drivers License has been updated successfully!');
                    vm.accountSetting.driverUrl = response.data.driverUrl;
                    vm.accountSetting.driverlicense_file_name = true;
                    break;

                case 'proofinsurance':
                    toastr.success('Your Proof Insurance has been updated successfully!');
                    vm.accountSetting.proofUrl = response.data.proofUrl;
                    vm.accountSetting.proofinsurance_file_name = true;
                    break;
            }
        };

        vm.uploader.onErrorItem = function(item, response) {
            toastr.error(response.errors[0]);
            // console.log(response);
        };

        /**
         * update client account setting.
         */
        function updateAccount()
        {
            // update main accountSetting
            if (vm.addr.types) {
                vm.accountSetting.address1 = vm.addr.formatted_address;
                vm.accountSetting.addrlat = vm.addr.geometry.location.lat();
                vm.accountSetting.addrlng = vm.addr.geometry.location.lng();
            } else {
                if (!vm.accountSetting.address1) {
                    toastr.warning('Please input address exatly');
                    return;
                }
            }

            $auth.updateAccount(vm.accountSetting, {config: 'provider'}).then(function() {
                toastr.success('Account setting updated successfully!');
            }, function (data) {
                angular.forEach(data.alert, function(alert){
                    toastr.error(alert);
                });
            });

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

            //update notification setting
            var payload1 = {sms: vm.agreement.sms, email: vm.agreement.email};

            Restangular.one('provider/setting').put(payload1);

        }



    }

})();
