(function ()
{
    'use strict';

    angular
        .module('app.pages.homepage', ['slick'])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.pages_homepage', {
            url  : '/pages/homepage',
            views: { 
                'content@app': {
                    templateUrl: 'app/main/pages/homepage/homepage.html',
                    controller : 'HomepageController as vm'
                },

                'navbar@app': {
                    templateUrl: 'app/main/layouts/navbar.html',
                    controller : 'HomepageController as vm'
                }
            }
        });

       

    }

})();