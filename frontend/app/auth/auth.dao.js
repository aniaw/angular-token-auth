(function ()
{
    'use strict';

    function AuthDAO($resource)
    {
        var api = $resource('api/authenticate/:a', null, {
            test: {method: 'GET', params: {a: 'test'}}
        });

        return {
            login: function (user)
            {
                return api.save(user).$promise;
            },
            test: function ()
            {
                return api.test().$promise;
            }
        };
    }

    angular.module('auth.client').factory('AuthDAO', ['$resource', AuthDAO]);
})();
