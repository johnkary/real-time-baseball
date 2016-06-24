/**
 * Serve the latest game stats to browsers
 */

var r = require('rethinkdb'),
    sockio = require("socket.io"),
    io = sockio.listen(app.listen(config.port), {log: false}),
    dbName = "game",
    tableName = "posts";

r.connect({ host: 'localhost', port: 28015, db: dbName }, function (err, conn) {
    if (err) throw err;

    r.table(tableName).changes().run(conn).then(function (cursor) {
        cursor.each(function (err, item) {
            if (item && item.new_val) {
                io.sockets.emit("step", item.new_val);
            }
        });
    })
    .error(function (err) {
        console.log("Error:", err);
    });
});
