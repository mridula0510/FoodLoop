import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // You can whitelist React URL here
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Node Backend Live');
});

// Socket.io logic
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('order-placed', (data) => {
    console.log('Order placed:', data);
    io.emit('order-update', data); // broadcast to all clients
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// ✅ Fixed template literal syntax here
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
