// socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // URL where your node server is running

export default socket;
