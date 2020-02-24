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
        Mongolib.getDatabase(db => {
            Mongolib.insertDocuments(db, () => {
                socketApi.sendNotification()
            }, data);
        })
    })
});

socketApi.sendNotification = () => {
    Mongolib.getDatabase(db => {
        Mongolib.findDocuments(db, docs => {
            io.sockets.emit('messages', docs);
        });
    })
}

module.exports = socketApi;
