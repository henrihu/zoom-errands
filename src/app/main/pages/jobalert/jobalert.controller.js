(function ()
{
    'use strict';

    angular
        .module('app.pages.jobalert')
        .controller('JobalertController', JobalertController);

    /** @ngInject */
    JobalertController.$inject = ['$scope', '$state', 'Restangular', '$location', 'toastr', '$log', 'ngDialog'];
    function JobalertController($scope, $state, Restangular, $location, toastr, $log, ngDialog)
    {
        var vm = this;    

        var taskid = $location.search().id;
        $log.log(taskid);
        if (taskid) {
            Restangular.one('provider/tasks', taskid).get()
            .then(function(task) {
                vm.job = task;
                $log.log(vm.job);
            }, function(data) {
                toastr.error(data.data.errors, 'Error');    
            }); 
        } else {
            toastr.error('There is no such a task.', 'Error');
        }        

        vm.acceptJob = function() {
            if (!$scope.user.id) {
                ngDialog.open({template: 'app/main/pages/jobalert/popupTmpl.html'});
            } else {
                Restangular.one('provider/tasks', taskid).one('accept').put()
                .then(function() {
                    toastr.success("You are awarded this task.", "Congratulations!");
                    $state.go('app.provider.editerrand', {id: taskid});
                }, function(data) {
                    $log.log(data);
                    toastr.error(data.data.errors.toString());
                });
            }
        };

        vm.declineJob = function() {
			$state.go('app.pages_homepage');
        };

        $scope.$on('auth:login-success', function() 
        {
            
            Restangular.one('provider/tasks', taskid).one('accept').put()
            .then(function() {
                toastr.success("You are awarded this task.", "Congratulations!");
                $state.go('app.provider.editerrand', {id: taskid});
            }, function(data) {
                $log.log(data);
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