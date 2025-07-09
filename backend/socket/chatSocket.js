export const initChatSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join room
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
    });

    // Send message
    socket.on('sendMessage', (message) => {
      io.to(message.chatRoomId).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
