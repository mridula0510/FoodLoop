import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import socketSetup from './config/socket.js';

// Load env variables
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import authRoutes from './routes/authRoutes.js';
import outletRoutes from './routes/outletRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/outlets', outletRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('🍽 Food Court Backend is Live 🚀');
});

// Socket.io setup
const io = new Server(server, {
  cors: { origin: '*' }
});
socketSetup(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
