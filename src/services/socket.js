import { io } from "socket.io-client";

const socket = io("https://waba-backend-2.onrender.com", {
  autoConnect: false,
});

export default socket;
