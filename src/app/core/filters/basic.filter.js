(function ()
{
    'use strict';

    angular
        .module('app.provider')
        .filter('toTrusted', toTrustedFilter)
        .filter('htmlToPlaintext', htmlToPlainTextFilter)
        .filter('nospace', nospaceFilter)
        .filter('capitalize', capitalizeFilter)
        .filter('humanizeDoc', humanizeDocFilter)
        .filter('yesNo', yesNoFilter)
        .filter('yesInprogress', yesInprogressFilter)
        .filter('addMinusSignToZero', addMinusSignToZeroFilter);

    /** @ngInject */
    function yesInprogressFilter()
    {
        return function(input) {
          return (input) ? 'In process' : 'No';
        };
    }

    /** @ngInject */
    function yesNoFilter()
    {
        return function(input) {
          return (input) ? 'Yes' : 'No';
        };
    }

    /** @ngInject */
    function capitalizeFilter()
    {
        return function(input) {
          return (input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        };
    }

    /** @ngInject */
    function toTrustedFilter($sce)
    {
        return function (value)
        {
            return $sce.trustAsHtml(value);
        };
    }

    /** @ngInject */
    function htmlToPlainTextFilter()
    {
        return function (text)
        {
            return String(text).replace(/<[^>]+>/gm, '');
        };
    }

    function nospaceFilter()
    {
        return function (value)
        {
            return (!value) ? '' : value.replace(/ /g, '');
        };
    }

    /** @ngInject */
    function humanizeDocFilter()
    {
        return function (doc)
        {
            if ( !doc )
            {
                return;
            }
            if ( doc.type === 'directive' )
            {
                return doc.name.replace(/([A-Z])/g, function ($1)
                {
                    return '-' + $1.toLowerCase();
                });
            }
            return doc.label || doc.name;
        };
    }


    /** @ngInject */
    function addMinusSignToZeroFilter()
    {
        return function(input){
            return parseFloat(input) != 0 ? '-' + input : input;
        }
    }


})();