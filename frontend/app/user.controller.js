(function ()
{
    'use strict';

    function UserController($window, AuthDAO, AuthService)
    {
        var ctrl = this;

        ctrl.user = {username: 'john.doe', password: 'foobar'};
        ctrl.isAuthenticated = false;
        ctrl.welcome = '';
        ctrl.message = '';

        function setWelcomeMessage(profile)
        {
            ctrl.welcome = 'Welcome ' + profile.first_name + ' ' + profile.last_name;
        }

        function decodeProfile(token)
        {
            var encodedProfile = token.split('.')[1];
            return JSON.parse(AuthService.urlBase64Decode(encodedProfile))
        }

        function handleError()
        {
            // Handle login errors here
            ctrl.error = 'Error: Invalid user or password';
            ctrl.welcome = '';
        }

        ctrl.submit = function ()
        {
            var profile;

            AuthDAO.login(ctrl.user).then(function (result)
            {
                $window.sessionStorage.token = result.token;
                ctrl.isAuthenticated = true;
                setWelcomeMessage(decodeProfile(result.token))

            }).catch(function ()
            {
                // Erase the token if the user fails to log in
                delete $window.sessionStorage.token;
                ctrl.isAuthenticated = false;
                handleError();
            });
        };

        ctrl.logout = function ()
        {
            ctrl.welcome = '';
            ctrl.message = '';
            ctrl.isAuthenticated = false;
            delete $window.sessionStorage.token;
        };

        ctrl.callRestricted = function ()
        {
            AuthDAO.test().then(function (name)
            {
                ctrl.message += ' ' + name;

            }).catch(function (data)
            {
                alert(data);
            });
        };

    }

    angular.module('auth.client').controller('UserController', UserController);

})();



