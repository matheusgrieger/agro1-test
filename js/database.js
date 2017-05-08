var p = new Promise(function(resolve, reject) {
	// creates database in browser to use
	var db = openDatabase("app2", "1.1", "Database for Agro1 test app", 2 * 1024 * 1024);

	if (db) {
		// if it was successfully created, create a table if needed
		db.transaction(function(transaction) {
			transaction.executeSql("CREATE TABLE IF NOT EXISTS `people` (`id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `first_name` TEXT, `last_name` TEXT, `nationality` TEXT, `picture` TEXT)", null, function(tx, results) {
				resolve(db);
			});
		});
	}

});

module.exports = p;
