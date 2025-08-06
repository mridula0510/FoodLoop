import React, { useEffect } from "react";
import socket from "../socket";

function TestSocket() {
  useEffect(() => {
    // Listening for message from server
    socket.on("server-message", (data) => {
      console.log("Received from server:", data);
    });

    return () => {
      socket.off("server-message"); // Cleanup on unmount
    };
  }, []);

  const sendMessage = () => {
    socket.emit("client-message", { user: "ReactUser", msg: "Hello from React!" });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Socket Test</h2>
      <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
        Send Message to Node.js
      </button>
    </div>
  );
}

export default TestSocket;
