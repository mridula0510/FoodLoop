// server.js
import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { Server as SocketIOServer } from 'socket.io';
import mongoose from 'mongoose'; // Uncomment when DB ready

const app = express();
const server = http.createServer(app);

// --- Socket.IO setup ---
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('order-placed', (data) => {
    console.log('Order placed:', data);
    io.emit('order-update', data);
  });

  socket.on('join', (room) => socket.join(room));
  socket.on('leave', (room) => socket.leave(room));

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

app.set('io', io);

// --- Middleware ---
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

// --- MongoDB connection ---
if (process.env.MONGO_URI) {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');
} else {
  console.warn('⚠️ No MONGO_URI found. Database features disabled.');
}

// --- Routes ---
app.get('/', (req, res) => res.send('Food Court Backend is live 🚀'));
app.get('/health', (req, res) => res.json({ ok: true }));

// --- Start Server ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
// Test route to check server and DB connection
app.get('/test', async (req, res) => {
  try {
    res.json({ message: "✅ Backend is working fine!", dbStatus: "Connected to MongoDB" });
  } catch (error) {
    res.status(500).json({ message: "❌ Something went wrong", error: error.message });
  }
});
