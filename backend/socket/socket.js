import { Server } from "socket.io";

const setupSocketIO = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    }
  });

  io.on("connection", (socket) => {
    // Listen for new messages
    socket.on("notify", (data) => {
      io.emit("notification", data);
    })

    socket.on("join", (userEmail) => {
      if (userEmail){
        socket.join(userEmail);
      }
    })

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    })
  })

  return io;
}

export default setupSocketIO;