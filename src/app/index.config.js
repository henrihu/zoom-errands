(function() {
  'use strict';

  angular
    .module('zeyogen')
    .config(config);

  // you might call this after your module initalization
  angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 250)


  /** @ngInject */
  config.$inject = ['RestangularProvider', 'API_URL', '$authProvider', '$logProvider', 'toastrConfig', '$windowProvider'];
  function config(RestangularProvider, API_URL, $authProvider, $logProvider, toastrConfig, $windowProvider) {

    var $window = $windowProvider.$get();
    // Enable log
    $logProvider.debugEnabled(true);

    // toastr configuration
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 7000;
    toastrConfig.positionClass = 'toast-top-right';
    // toastrConfig.preventDuplicates = true;
    toastrConfig.preventOpenDuplicates = true;
    toastrConfig.progressBar = false;
    /////////////////////

    RestangularProvider.setBaseUrl(API_URL);

    // var isMob = $window.cordova !== angular.undefined;
    $authProvider.configure([
      {
      //   default: {
      //     apiUrl:  API_URL,
      //     proxyIf: function() { $window.isOldIE(); },
      //     authProviderPaths: {
      //       github:    '/auth/github',
      //       facebook:  '/auth/facebook',
      //       google:    '/auth/google_oauth2'
      //     },
      //     omniauthWindowType: isMob ? 'inAppBrowser' : 'newWindow',
      //     storage: isMob ? 'localStorage' : 'cookies'
      //   }
      // }, {
        provider: {
          apiUrl:                API_URL,
          proxyIf:               function() { $window.isOldIE(); },
          signOutUrl:            '/provider_auth/sign_out',
          emailSignInPath:       '/provider_auth/sign_in',
          emailRegistrationPath: '/provider_auth',
          accountUpdatePath:     '/provider_auth',
          accountDeletePath:     '/provider_auth',
          passwordResetPath:     '/provider_auth/password',
          passwordUpdatePath:    '/provider_auth/password',
          tokenValidationPath:   '/provider_auth/validate_token',
          authProviderPaths: {
            github:    '/provider_auth/github',
            facebook:  '/provider_auth/facebook',
            google:    '/provider_auth/google_oauth2'
          },
          cookieOps: {
            path: "/",
            expires: 9999,
            expirationUnit: 'days',
            // domain: 'provider.zoomerrands.com',
            secure: false
          }
        }
      }
    ]);
  }

})();
