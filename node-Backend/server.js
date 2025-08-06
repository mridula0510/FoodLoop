const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const dotenv = require('dotenv');

// Load .env variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Basic route
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Socket.io setup
io.on('connection', (socket) => {
  console.log('New socket connection:', socket.id);

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
