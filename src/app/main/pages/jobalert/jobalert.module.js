(function ()
{
    'use strict';

    angular
        .module('app.pages.jobalert', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.pages_jobalert', {
            url  : '/pages/job_alert?id',
            views: { 
                'content@app': {
                    templateUrl: 'app/main/pages/jobalert/jobalert.html',
                    controller : 'JobalertController as vm'
                },

                'navbar@app': {
                    templateUrl: 'app/main/layouts/blank_navbar.html'
                    // controller : 'HomepageController as vm'
                }
            }
        });
    }
})();