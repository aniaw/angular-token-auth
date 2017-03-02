(function ()
{
    'use strict';
    angular.module('auth.client').config(function ($httpProvider)
    {
        $httpProvider.interceptors.push('authInterceptor');
    });
})();
