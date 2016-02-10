(function() {
  'use strict';

  angular
		.module('zeyogen', [
			'ngCookies', 
			'ngTouch',
      'ngDialog',
			'ngSanitize', 
			'ngMessages', 
			'ngAria', 
			'ui.router', 
			'ui.bootstrap',
			'ui.bootstrap.datetimepicker', 
			'toastr',
			'uiGmapgoogle-maps',
			'restangular',
			'ng-token-auth',
			'angularFileUpload',
			'ui.select',
			'smart-table',
			'google.places',
			'focus-if', 
			'angularPayments',
			'ui.utils.masks',

			// Core
			// 'app.core',

			// Pages
			'app.pages.auth.login',
			'app.pages.auth.register',
			'app.pages.auth.forgot-password',


			//homepage module
			'app.pages.homepage',

			'app.pages.jobalert',

			// client module
			'app.client',
			// provider module
			'app.provider'
									
		]);

})();
