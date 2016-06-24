/**
 * Serve the latest game stats to browsers
 */

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Serve frontend Gamecast HTML
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// Serve backend HTML that can send game data
app.get('/admin', function (req, res) {
    res.sendFile(__dirname + '/admin.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('pitches', function (pitch) {
        io.emit('pitches', pitch);
    });
});

// Broadcast pitches
io.on('pitches', function (socket) {
    socket.broadcast.emit()
});

http.listen(3000, function () {
    console.log('View in browser http://localhost:3000');
});

// var r = require('rethinkdb'),
//     sockio = require("socket.io"),
//     io = sockio.listen(app.listen(config.port), {log: false}),
//     dbName = "game",
//     tableName = "posts";
//
// r.connect({host: 'localhost', port: 28015, db: dbName}, function (err, conn) {
//     if (err) throw err;
//
//     r.table(tableName).changes().run(conn).then(function (cursor) {
//         cursor.each(function (err, item) {
//             if (item && item.new_val) {
//                 io.sockets.emit("step", item.new_val);
//             }
//         });
//     })
//     .error(function (err) {
//         console.log("Error:", err);
//     });
// });
//
