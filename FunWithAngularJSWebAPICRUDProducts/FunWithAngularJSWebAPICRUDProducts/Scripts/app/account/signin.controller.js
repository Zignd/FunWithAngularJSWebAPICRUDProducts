﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('SignInController', SignInController);

    SignInController.$inject = ['$location', 'user'];

    function SignInController($location, user) {
        var vm = this;

        vm.username = '';
        vm.password = '';
        vm.persist = false;
        vm.loginButtonText = defaultLoginButtonText;
        vm.loginButtonDisabled = false;
        vm.error = null;

        var defaultLoginButtonText = 'Login';

        function disableLoginButton() {
            vm.loginButtonText = 'Attempting login...';
            vm.loginButtonDisabled = true;
        }

        function enableLoginButton(message) {
            vm.loginButtonText = defaultLoginButtonText;
            vm.loginButtonDisabled = false;
        }

        function onSuccessfulLogin() {
            var returnUrl = $location.search('returnUrl');
            $location.path(returnUrl);
            $location.replace();
        }

        function onFailedLogin(error) {
            vm.error = error;
        }

        vm.login = function () {
            vm.error = null;
            disableLoginButton();
            user.authenticate(vm.username, vm.password, vm.persist, onSuccessfulLogin, onFailedLogin);
        };
    }
})();