// using module import
import dotenv from "dotenv"
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

import userController from "./controllers/userController.js";

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

const PORT = process.env.PORT || 3000;

const mockReq = {}
const mockRes = {
  json: (body) => {
    console.log(body)
  }
}

await userController.getAllUser(mockReq, mockRes)

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
})