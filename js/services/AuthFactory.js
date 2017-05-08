'use strict';
var angular = require('angular');

/**
 * Auth declaration
 * Module: app
 */
angular
	.module('app')
	.factory('Auth', AuthFactory);

/**
 * AuthFactory injectables
 * @type {Array}
 */
AuthFactory.$inject = [
	'$q',
	'$sessionStorage',
	'$timeout'
];

/**
 * AuthFactory function declaration
 */
function AuthFactory($q, $sessionStorage, $timeout) {
	/**
	 * Data variables
	 */
	var logged = !!$sessionStorage.logged;

	/**
	 * Service declaration
	 */
	var service = {
		logged: UserLogged,
		checkLogin: CheckLogin,
		login: Login
	};
	return service;

	////////////

	function UserLogged() {
		return logged;
	}

	function CheckLogin() {
		return $q(function(resolve, reject) {
			if (logged) {
				resolve();
			}
			else {
				reject('auth');
			}
		});
	}

	function Login(credentials) {
		return $q(function(resolve, reject) {
			// timeout simulating external request
			$timeout(function() {
				// save to sessionStorage
				$sessionStorage.logged = true;
				logged = true;
				resolve();
			}, 1000);
		});
	}

	////////////
}
