(function() {
  'use strict';

  angular
		.module('zeyogen', [
			'ngCookies', 
			'ngTouch', 
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

			// Core
			// 'app.core',

			// Pages
			'app.pages.auth.login',
			'app.pages.auth.register',
			'app.pages.auth.forgot-password',


			//homepage module
			'app.pages.homepage',

			// client module
			'app.client',
			// provider module
			'app.provider'
									
		]);

})();
