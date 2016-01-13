(function ()
{
    'use strict';

    angular
        .module('app.pages.jobdetails', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.pages_jobdetails', {
            url  : '/pages/jobdetails',
            views: { 
                'content@app': {
                    templateUrl: 'app/main/pages/jobdetails/jobdetails.html',
                    controller : 'JobdetailsController as vm'
                }
            }
        });
    }
})();