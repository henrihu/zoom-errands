(function() {
  'use strict';

  angular
    .module('zeyogen')
    .config(config);

  /** @ngInject */
  function config(RestangularProvider, API_URL, $authProvider, $logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    /////////////////////

    RestangularProvider.setBaseUrl(API_URL);

    var isMob = window.cordova !== undefined;
    $authProvider.configure([
      {
        default: {
          apiUrl:  API_URL,
          proxyIf: function() { window.isOldIE(); },
          authProviderPaths: {
            github:    '/auth/github',
            facebook:  '/auth/facebook',
            google:    '/auth/google_oauth2'
          },
          omniauthWindowType: isMob ? 'inAppBrowser' : 'newWindow',
          storage: isMob ? 'localStorage' : 'cookies'
        }
      }, {
        provider: {
          apiUrl:                API_URL,
          proxyIf:               function() { window.isOldIE(); },
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
          }
        }
      }
    ]);
  }

})();
