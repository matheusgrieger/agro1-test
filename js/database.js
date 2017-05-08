var p = new Promise(function(resolve, reject) {
	// creates database in browser to use
	var db = openDatabase("app", "1.0", "Database for Agro1 test app", 2 * 1024 * 1024);

	if (db) {
		// if it was successfully created, create a table if needed
		db.transaction(function(transaction) {
			transaction.executeSql("CREATE TABLE IF NOT EXISTS `people` (`id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `name` TEXT, `birthdate` REAL)", null, function(tx, results) {
				resolve(db);
			});
		});
	}

});

module.exports = p;
