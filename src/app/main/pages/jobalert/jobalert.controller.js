(function ()
{
    'use strict';

    angular
        .module('app.pages.jobalert')
        .controller('JobalertController', JobalertController);

    /** @ngInject */
    JobalertController.$inject = ['$scope', '$auth', '$state', 'Restangular', '$location', 'toastr',  'ngDialog'];
    function JobalertController($scope, $auth, $state, Restangular, $location, toastr,  ngDialog)
    {
        var vm = this;

        var taskid = $location.search().id;
        if (taskid) {
            Restangular.one('provider/tasks', taskid).get()
            .then(function(task) {
                vm.job = task;
                if (vm.job.pick_up_address) {
                    vm.job.pick_up_address_city = vm.job.pick_up_address.split(',').slice(-3).join(',').trim()
                }
                if (vm.job.address) {
                    vm.job.address_city = vm.job.address.split(',').slice(-3).join(',').trim()
                }
            }, function(data) {
                toastr.error(data.data.errors, 'Error');
            });
        } else {
            toastr.error('There is no such a task.', 'Error');
        }

        vm.acceptJob = function() {
            if (!$scope.user.configName) {
                ngDialog.open({template: 'app/main/pages/jobalert/popupTmpl.html'});
            }else if ($scope.user.configName == 'default'){
                // $auth.signOut().then(function() {
                    ngDialog.open({template: 'app/main/pages/jobalert/popupTmpl.html'});
                // });
            }else {
                Restangular.one('provider/tasks', taskid).one('accept').put()
                .then(function() {
                    toastr.success("You are awarded this task.", "Congratulations!");
                    $state.go('app.provider.myerrand');
                }, function(data) {
                    toastr.error(data.data.errors.toString());
                });
            }
        };

        vm.declineJob = function() {
			$state.go('app.provider.finderrand');
        };

        $scope.$on('auth:login-success', function()
        {

            Restangular.one('provider/tasks', taskid).one('accept').put()
            .then(function() {
                toastr.success("You are awarded this task.", "Congratulations!");
                $state.go('app.provider.editerrand', {id: taskid});
            }, function(data) {
                toastr.error(data.data.errors.toString());
            });
        });

        // event 'auth:login-error'
        $scope.$on('auth:login-error', function(ev, data)
        {
            return toastr.error(data.errors[0], 'Authentication failure', {timeOut: 7000});
        });
    }
})();