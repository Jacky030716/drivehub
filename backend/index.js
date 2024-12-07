import dotenv from "dotenv"
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

dotenv.config()

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
}) 