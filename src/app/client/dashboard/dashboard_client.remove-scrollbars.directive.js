(function ()
{
    'use strict';

    angular
        .module('app.client.dashboard')
        .directive('maxWidthCls', maxWidthCls);

    maxWidthCls.$inject = ['$window', '$log'];
    function maxWidthCls($window, $log){
        var directive = {
            link: link,
            scope: {
                'mwConfig': '='
            },
            restrict: 'A'
        };

        return directive;

        function link(scope, element/*, attrs*/) {

            scope.$watch(getWindowDimensions, function(newVal){
                if (scope.mwConfig) {
                    if (newVal.w > scope.mwConfig.val) {
                        element.removeClass(scope.mwConfig.class);
                    } else {
                        element.addClass(scope.mwConfig.class);
                        if (scope.mwConfig.fn){
                            scope.mwConfig.fn();
                        }
                    }
                }
            }, true);
        }



        function getWindowDimensions() {
            return {
                'h': $window.innerHeight,
                'w': $window.innerWidth
            };
        }

    }


})();
