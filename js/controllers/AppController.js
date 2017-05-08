'use strict';
var angular = require('angular');

/**
 * AppController declaration
 * Module: app
 */
angular
	.module('app')
	.controller('AppController', AppController);

/**
 * AppController injectables
 * @type {Array}
 */
AppController.$inject = [
    '$state',
    '$transitions',
    '$mdSidenav'
];

/**
 * AppController function declaration
 */
function AppController($state, $transitions, $mdSidenav) {
	var vm = this;

	/**
	 * Data variables
	 */
	vm.toolbarVisible = $state.current.name != 'login';

	/**
	 * Bindable functions
	 */
	vm.toggleSidebar = ToggleSidebar;

	////////////

	function ToggleSidebar() {
		$mdSidenav('sidebar')
			.toggle();
	}

	////////////

	$transitions.onSuccess({}, function(transition) {
		var toState = transition.to();
		vm.toolbarVisible = toState.name != 'login';
	});
	$transitions.onStart({}, function() {
		$mdSidenav('sidebar')
			.close();
	});
}
