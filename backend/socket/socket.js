import { Server } from "socket.io";

const setupSocketIO = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    }
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // Listen for new messages
    socket.on("notify", (data) => {
      console.log(`Notification received: ${data}`);
      console.log(`Total connected clients: ${io.engine.clientsCount}`);
      io.emit("notification", data);
    })

    socket.on("join", (userEmail) => {
      if (userEmail){
        socket.join(userEmail);
        console.log(`Client ${socket.id} joined room: ${userEmail}`);
      }
    })

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    })
  })

  return io;
}

export default setupSocketIO;