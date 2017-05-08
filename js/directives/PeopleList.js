'use strict';
var angular = require('angular');

/**
 * peopleList declaration
 * Module: app
 */
angular
	.module('app')
	.directive('peopleList', PeopleListDirective);

/**
 * PeopleListDirective function declaration
 */
function PeopleListDirective() {
	/**
	 * Directive declaration
	 */
	var directive = {
		// only element directive
		restrict: 'E',
		// creates isolated scope
		scope: {
			// list of people
			people: '=',
			// text to filter
			filter: '=',
			// recently created id to highlight
			idHighlight: '@',
			// function to execute in parent scope
			// after clicking on delete btn
			delete: '='
		},
		link: function(scope) {
			// filters using given text
			scope.textFilter = function() {
				var reg = new RegExp(scope.filter, 'i');
				return scope.people.filter(function(person) {
					return reg.test(person.name);
				});
			}
		},
		template: require('~/html/directives/people-list.html')
	};
	return directive;
}
