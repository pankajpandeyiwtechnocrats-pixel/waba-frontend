import { io } from "socket.io-client";

const socket = io("https://waba-backend-wq2d.onrender.com", {
  autoConnect: false,
});

export default socket;
