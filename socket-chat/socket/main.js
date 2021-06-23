const socketIo = require('socket.io');

const createSocket = server => {
    const io = socketIo(server);
    io.on('connection', socket => socket.on("messageSent", msg => io.sockets.emit("messageReceived", msg)));
}

module.exports = createSocket;