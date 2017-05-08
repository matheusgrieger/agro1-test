'use strict';
var angular = require('angular');

/**
 * LoginController declaration
 * Module: app
 */
angular
	.module('app')
	.controller('LoginController', LoginController);

/**
 * LoginController injectables
 * @type {Array}
 */
LoginController.$inject = [
    '$scope',
    'Auth',
    '$state'
];

/**
 * LoginController function declaration
 */
function LoginController($scope, Auth, $state) {
	var vm = this;

	/**
	 * Data variables
	 */
	vm.credentials = {
		username: '',
		password: ''
	};
	vm.loading = false;

	/**
	 * Bindable functions
	 */
	vm.login = Login;

	////////////

	// login function
	function Login() {
		vm.loading = true;

		// calls Auth method, gets promise
		Auth.login(vm.credentials)
			.then(function() {
				// success!
				Redirect();
			});
	}

	function Redirect() {
		// redirects to state specified in url (base64-ified json)
		if ($state.params.redirect) {
			var redirect = JSON.parse(atob($state.params.redirect));
			$state.go(redirect.state, redirect.params || {});
		}
		// or go home
		else {
			$state.go('home');
		}
	}

	////////////

	// checks if the user is already logged in
	Auth.checkLogin()
		.then(function() {
			Redirect();
		}, function(error) {});

}
