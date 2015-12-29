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
			'toastr',
			'uiGmapgoogle-maps',
			'restangular',
			'ng-token-auth',
			'angularFileUpload',
			'ui.select',
			// 'ui.bootstrap.datetimepicker',

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
