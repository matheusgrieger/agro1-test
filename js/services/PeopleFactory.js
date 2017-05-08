'use strict'
var angular = require('angular');

/**
 * People declaration
 * Module: app
 */
angular
	.module('app')
	.factory('People', PeopleFactory);

/**
 * PeopleFactory injectables
 * @type {Array}
 */
PeopleFactory.$inject = [
    '$q'
];

/**
 * PeopleFactory function declaration
 */
function PeopleFactory($q) {
	/**
	 * Data variables
	 */

	/**
	 * Service declaration
	 */
	var service = {
		addPerson: AddPerson,
		load: LoadPeople,
		delete: Delete
	};
	return service;

	////////////

	/**
	 * Adds person to database
	 * @param {Object} data name and birthdate
	 */
	function AddPerson(data) {
		return $q(function(resolve, reject) {
			// requests database promise
			var db = require('~/js/database');
			db.then(function(database) {
				// starts transaction
				database.transaction(function(transaction) {
					// executes insert sql
					// uses prepared statements to try and avoid injections
					transaction.executeSql('INSERT INTO `people` (`first_name`, `last_name`, `nationality`, `picture`) VALUES (?, ?, ?, ?)', [data.first_name, data.last_name, data.nationality.value, data.picture], function(tx, results) {
						// resolves if inserted one
						if (results.rowsAffected === 1) {
							resolve(results.insertId);
						}
						else {
							reject(results);
						}
					}, function() {
						reject(arguments);
					});
				});
			});
		});
	}

	/**
	 * Loads everyone from the database
	 */
	function LoadPeople() {
		return $q(function(resolve, reject) {
			// requests database promise
			var db = require('~/js/database');
			db.then(function(database) {
				// starts transaction
				database.transaction(function(transaction) {
					// executes select sql
					transaction.executeSql('SELECT * FROM `people`', null, function(tx, results) {
						// resolves with returned rows
						resolve(results.rows);
					}, function() {
						reject(arguments);
					});
				});
			});
		});
	}

	/**
	 * Deletes person from database
	 * @param {Number} id person's id
	 */
	function Delete(id) {
		return $q(function(resolve, reject) {
			// requests database promise
			var db = require('~/js/database');
			db.then(function(database) {
				// starts transaction
				database.transaction(function(transaction) {
					// executes select sql
					// uses prepared statements to try and avoid injections
					transaction.executeSql('DELETE FROM `people` WHERE `id` = ?', [id], function(tx, results) {
						// resolves if inserted one
						if (results.rowsAffected === 1) {
							resolve();
						}
						else {
							reject(results);
						}
					}, function() {
						reject(arguments);
					});
				});
			});
		})
	}

	////////////

}
