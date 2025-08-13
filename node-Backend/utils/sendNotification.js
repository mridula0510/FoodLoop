// utils/sendNotification.js
export const sendNotification = (io, channel, payload) => {
    if (!io) return console.warn("sendNotification: io not available");
    io.emit(channel, payload);
  };
  