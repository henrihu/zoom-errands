(function() {
  'use strict';

  angular
    .module('zeyogen')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider)
  {
      $locationProvider.html5Mode(true);

      // $urlRouterProvider.otherwise('/client/myerrand');
      $urlRouterProvider.otherwise('/pages/homepage');

      $stateProvider
          .state('app', {
              abstract: true,
              views   : {
                  'main@'         : {
                      templateUrl: 'app/main/layouts/ze_layout.html'
                  },  

                  'navbar@app'    : {
                      templateUrl: 'app/main/layouts/navbar.html',
                      controller : 'AppController as vm'
                  }                 

              }
          });
  }

})();
