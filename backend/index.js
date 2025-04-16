import dotenv from "dotenv";
import express from "express";
import http from "http"; // Import HTTP module
import cors from "cors";
import routes from "./routes/index.js";
import setupSocketIO from "./socket/socket.js";

dotenv.config();

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = setupSocketIO(server); // Pass the HTTP server to setupSocketIO

// Middleware
app.use(
  cors({
    origin: "https://drivehub-pink.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Attach Socket.IO instance to req
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use("/api", routes);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
