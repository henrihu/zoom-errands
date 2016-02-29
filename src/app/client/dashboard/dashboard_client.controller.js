(function ()
{
    'use strict';

    angular
        .module('app.client.dashboard')
        .controller('DashboardClientController', DashboardClientController);
        //.directive('eventCalendar', eventCalendarDirective);

    /** @ngInject */
    DashboardClientController.$inject = ['$anchorScroll', '$location', '$log', '$scope', 'toastr', 'Restangular', 'FileUploader', 'API_URL', '$auth'];
    function DashboardClientController($anchorScroll, $location, $log, $scope, toastr, Restangular, FileUploader, API_URL, $auth)
    {
        var vm = this; 
        vm.submitErrand = submitErrand; 
        vm.errand = {}; 
        vm.errand.contact = $scope.user.phone1;
        vm.sbConfig = {
            autoHideScrollbar: false,
            advanced:{
                updateOnContentResize: true
            },
            scrollInertia: 0
        }

        // errands var
        vm.deleteTask = deleteTask;
        //vm.loadMore = loadMore;
        vm.limit = 7;
        vm.curPos = 0;
        // -----------

        vm.events = {};

        vm.triggerFileInput = triggerFileInput;

        vm.isOpen = false;
        vm.uploader = new FileUploader({            
            alias: 'upload',
            // method: 'PUT',
            headers: $auth.retrieveData('auth_headers')              
        });

        vm.uploader.filters.push({
            name: 'customFilter',
            fn: function() {
                return vm.uploader.queue.length < 5;
            }
        });

        vm.autocompleteOptions = {
            componentRestrictions: { country: 'us' },
            types: ['geocode']
        }


        // Restangular.one('client/tasks/mytaskscalendar').get()
        // .then(function(data){
        //     vm.events = data.events;
        // }, function(data){
        //     // took from other controller, I believe error will be shown same way.
        //     toastr.warning(data.data.alert);
        // });

        Restangular.all('client/alltypes').getList()
        .then(function(types) {
            // $log.log(types);
            vm.alltypes = types;
        });

        Restangular.all('client/zoomoffices').getList()
        .then(function(offices) {
            // $log.log(types);
            vm.zoomoffices = offices;
        });

        

        vm.services = [
          {
            'image': '/assets/images/dashboard-delivery.png',
            'title': 'Delivery',
            'id': 3 
          },
          {
            'image': '/assets/images/dashboard-cleaning.png',
            'title': 'Cleaning',
            'id': 1 
          },
          {
            'image': '/assets/images/dashboard-shopping.png',
            'title': 'Shopping',
            'id': 5 
          },
          {
            'image': '/assets/images/dashboard-other.png',
            'title': 'Dog walker',
            'id': 0 
          },
          {
            'image': '/assets/images/dashboard-other.png',
            'title': 'Clerical',
            'id': 4 
          },
          {
            'image': '/assets/images/dashboard-other.png',
            'title': 'Grocery',
            'id': 6 
          },
          {
            'image': '/assets/images/dashboard-other.png',
            'title': 'Pets',
            'id': 7 
          },
          {
            'image': '/assets/images/dashboard-other.png',
            'title': 'Decorating',
            'id': 2 
          }
        ];

        vm.gotoAnchor = function(id) {
            
            $log.log(id);
            if ($location.hash() !== 'form-anchor') {
                $location.hash('form-anchor');
            } else {
                $anchorScroll();
            }

            vm.errand.type_id = vm.alltypes[id].id;          
        };

        vm.openCalendar = function(e) { 
            e.preventDefault();
            e.stopPropagation();

            vm.isOpen = true;
        };

        vm.reset = function() {
            vm.errand = {};
            vm.uploader.clearQueue();
        }
        

        function submitErrand() {            
            
            if (vm.addr.types) {
                var p = vm.addr;
                for (var i = 0; i < p.address_components.length; i++) {
                  var addressType = p.address_components[i].types[0];
                  if (addressType=="locality"){
                    vm.errand.city = p.address_components[i]['long_name'];
                    // vm.shortCity = p.address_components[i]['short_name'];
                    break;              
                  }
                }
                if (null === vm.errand.city || angular.isUndefined === vm.errand.city) {
                    toastr.warning('Please input address exatly.');   
                    return; 
                }
                
                vm.errand.address = vm.addr.formatted_address;
                vm.errand.addrlat = vm.addr.geometry.location.lat();
                vm.errand.addrlng = vm.addr.geometry.location.lng();
                Restangular.all('client/tasks').post({task: vm.errand})
                .then(function(data) {
                    // $log.log(data);
                    vm.uploader.url = API_URL + '/client/tasks/' + data.id + '/upload'
                    vm.uploader.uploadAll();
                    toastr.success('Your task ' + data.title + ' has been accepted.', 'Accept!');
                    // $state.go('app.client.myerrand');
                }, function(data) {
                    $log.log(data);
                    toastr.warning(data.data.alert);
                });
            }else {
                toastr.warning('Please input address exatly');           
            }
            
        }

        vm.slickOnInit = function(){
          vm.refreshing=true;
          $scope.$apply();
          vm.refreshing=false;
          $scope.$apply();
        };
        

        vm.uploader.onBeforeUploadItem = function(item) 
        {
            item.url = vm.uploader.url;
        };

        vm.uploader.onCompleteAll = function() {
            
            vm.uploader.clearQueue();
            // $state.go('app.client.myerrand');
        }

        function triggerFileInput(selectedInput)
        {
            vm.selectedInput = selectedInput;
            angular.element('#errand-uploader').trigger('click');
        }

        function deleteTask(task)
        {
            Restangular.one('client/tasks', task.id).remove()
                .then(function(data) {
                    var index = vm.tasks.indexOf(task);
                    if (index !== -1) {
                        vm.tasks.splice(index, 1);
                        toastr.success('Your task ' + data.title + 'has been cancelled.');
                    }

                }, function(error) {
                    toastr.error(error);
                });

        }

        vm.breakpointCards = [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    arrows: false
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: false
                }
            }
        ];

        /*
        function loadMore()
        {
            Restangular.all('client/tasks/mytasks').getList({'limit': vm.limit, 'offset': vm.curPos})
                .then(function(tasks) {
                    vm.tasks = vm.tasks.concat(tasks);
                    vm.displayedtasks = [].concat(vm.tasks);
                    vm.curPos = vm.curPos + tasks.length;
                    // $log.log(vm.displayedtasks);
                });
        }
        */

    }


})();
