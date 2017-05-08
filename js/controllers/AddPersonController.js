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
		first_name: null,
		last_name: null,
		nationality: null,
		picture: ''
	};
	vm.maxBirthdate = new Date();
	vm.searchNationality = '';
	vm.nationalities = [
		{
			value: 'BR',
			title: 'Brazilian'
		},
		{
			value: 'JP',
			title: 'Japanese'
		},
		{
			value: 'US',
			title: 'American'
		}
	];

	/**
	 * Bindable functions
	 */
	vm.addPerson = AddPerson;
	vm.filterNationalities = FilterNationalities;
	vm.pictureThumb = PictureThumb;

	////////////

	function AddPerson() {
		vm.waiting = true;

		People.addPerson(vm.data)
			.then(function(result) {
				$mdToast.showSimple('Person added successfully!');
				$state.go('home', {
					highlight: result
				});
			}, function(err) {
				console.log(err);
			});
	}

	function FilterNationalities() {
		var reg = new RegExp(vm.searchNationality, 'i');
		return vm.nationalities.filter(function(n) {
			return reg.test(n.title);
		});
	}

	function PictureThumb() {
		return vm.data.picture ? vm.data.picture : 'http://placehold.it/200x200&text=No picture';
	}

	////////////

}
