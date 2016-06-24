/**
 * Creates all application databases and tables.
 */

var r = require('rethinkdb'),
    dbName = "game",
    tableName = "posts";

var conn;
r.connect({ host: 'localhost', port: 28015 })
.then(function (c) {
    conn = c;
    return r.dbList().run(conn);
})

// Ensure database exists
.then(function (dbList) {
    if (false === dbList.indexOf(dbName)) {
        // Create database
        return r.dbCreate(dbName).run(conn);
    }
})

// Ensure table exists
.then(function () {
    return r.db(dbName).tableList().run(conn);
})
.then(function (tableList) {
    if (false === tableList.indexOf(tableName)) {
        // Create table
        return r.tableCreate(dbName).run(conn);
    }
})

// Done
.then(function () {
    console.log('END!');
    conn.close();
    process.exit(0);
})

// Catch errors from any previous then()
.catch(function (err) {
    console.log('ERROR!', err);
    process.exit(1);
});
