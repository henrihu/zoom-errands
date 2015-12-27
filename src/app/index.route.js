(function() {
  'use strict';

  angular
    .module('zeyogen')
    .config(routerConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider, $locationProvider)
  {
      $locationProvider.html5Mode(true);

      // $urlRouterProvider.otherwise('/dashboard-project');
      $urlRouterProvider.otherwise('/pages/homepage');

      $stateProvider
          .state('app', {
              abstract: true,
              views   : {
                  'main@'         : {
                      templateUrl: 'app/main/layouts/ze_layout.html'
                  },  

                  'navbar@app'    : {
                      templateUrl: 'app/main/layouts/navbar.html'
                  },                 

              }
          });
  }

})();
