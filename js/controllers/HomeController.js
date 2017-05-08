'use strict';
var angular = require('angular');

/**
 * HomeController declaration
 * Module: app
 */
angular
	.module('app')
	.controller('HomeController', HomeController);

/**
 * HomeController injectables
 * @type {Array}
 */
HomeController.$inject = [
    'People',
    '$state',
    '$mdDialog'
];

/**
 * HomeController function declaration
 */
function HomeController(People, $state, $mdDialog) {
	var vm = this;

	/**
	 * Data variables
	 */
	vm.people = [];
	vm.idHighlight = $state.params.highlight;
	vm.filter = '';

	/**
	 * Bindable functions
	 */
	vm.deletePerson = DeletePerson;

	////////////

	function Refresh() {
		vm.people = [];

		People.load()
			.then(function(results) {
				for (var i = results.length - 1; i >= 0; --i) {
					vm.people.push(results.item(i));
				}
				vm.people.reverse();
			});
	}

	function DeletePerson($event, person) {
		$mdDialog.show(
				$mdDialog
				.confirm()
				.title('Delete ' + person.name)
				.textContent('Are you sure?')
				.ok('Delete')
				.cancel('Cancel')
				.targetEvent($event)
			)
			.then(function() {
				People.delete(person.id)
					.then(Refresh);
			});
	}

	////////////

	Refresh();
}
