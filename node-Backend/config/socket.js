// config/socket.js
export default function connectSockets(io) {
    io.on("connection", (socket) => {
      console.log("🔌 New client connected:", socket.id);
  
      socket.on("placeOrder", (orderData) => {
        console.log("📦 placeOrder:", orderData);
        // broadcast new order to all listeners
        io.emit("order:new", orderData);
      });
  
      socket.on("join", (room) => {
        socket.join(room);
        console.log(`Socket ${socket.id} joined ${room}`);
      });
  
      socket.on("leave", (room) => {
        socket.leave(room);
      });
  
      socket.on("order:updateStatus", (payload) => {
        // payload: { orderId, status }
        if (payload?.orderId) {
          io.to(`order:${payload.orderId}`).emit("order:status", payload);
        }
        io.emit("order:updated", payload);
      });
  
      socket.on("disconnect", () => {
        console.log("❌ Client disconnected:", socket.id);
      });
    });
  }
  