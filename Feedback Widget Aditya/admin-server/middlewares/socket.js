const socketIo = require('socket.io');

let io;

const initializeSocket = (server) => {
    io = socketIo(server, { cors: { origin: "*" } });

    io.on('connection', (socket) => {

        socket.on('subscribe', (userId) => {
            socket.join(userId);
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
        });
    });

    return io;
};

const sendFeedback = (userId, feedback) => {
    if (io) {
        io.to(userId).emit('new-feedback', feedback);
    }
};

const sendQuestion = (userId, question) => {
    if (io) {
        io.to(userId).emit('new-question', question);
    }
};

module.exports = { initializeSocket, sendFeedback, sendQuestion };
