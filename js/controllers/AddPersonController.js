'use strict';
var angular = require('angular');

/**
 * AddPersonController declaration
 * Module: app
 */
angular
	.module('app')
	.controller('AddPersonController', AddPersonController);

/**
 * AddPersonController injectables
 * @type {Array}
 */
AddPersonController.$inject = [
    '$mdToast',
    'People',
    '$state'
];

/**
 * AddPersonController function declaration
 */
function AddPersonController($mdToast, People, $state) {
	var vm = this;

	/**
	 * Data variables
	 */
	vm.waiting = false;
	vm.data = {
		name: null,
		birthdate: null
	};
	vm.maxBirthdate = new Date();

	/**
	 * Bindable functions
	 */
	vm.addPerson = AddPerson;

	////////////

	function AddPerson() {
		vm.waiting = true;

		var data = {
			name: vm.data.name,
			birthdate: +vm.data.birthdate
		};

		People.addPerson(data)
			.then(function(result) {
				$mdToast.showSimple('Person added successfully!');
				$state.go('home', {
					highlight: result
				});
			}, function(err) {
				console.log(err);
			});
	}

	////////////

}
