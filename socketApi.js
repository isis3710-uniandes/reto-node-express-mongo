let socket_io = require("socket.io");
var io = socket_io();
var socketApi = {};

const Mongolib = require("./db/Mongolib");

socketApi.io = io;

io.on('connection', function (socket) {

    Mongolib.getDatabase(db => {
        Mongolib.findDocuments(db, docs => {
            io.sockets.emit('messages', docs);
        });
    })

    socket.on("new-message", data => {
        socketApi.sendNotification(data)
    })
});

socketApi.sendNotification = data => {

    Mongolib.getDatabase(db => {
        Mongolib.insertDocuments(db, () => {
            Mongolib.findDocuments(db, docs => {
                io.sockets.emit('messages', docs);
            })
        }, data)
    })
}

module.exports = socketApi;
