'use strict';
var angular = require('angular');

/**
 * app declaration
 * Module: app
 */
angular
	.module('app')
	.directive('app', AppDirective);

/**
 * AppDirective function declaration
 */
function AppDirective() {
	/**
	 * Directive declaration
	 */
	return {
		template: require('~/html/directives/app.html'),
		controller: 'AppController',
		controllerAs: 'app'
	}
}
