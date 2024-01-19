import { MongoError } from "mongodb";
import express, { Response } from "express";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import { config } from "dotenv";

// importing the image routes
import imageRouter from "./routes/image.routes.js";

config({ path: "./config.env" });

const app = express();

// parsing incoming Json data
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Enable cors middleware
app.use(cors());

const PORT = process.env.PORT || 8800;
const DB_CONNECTION =
  process.env.DATABASE_CONNECTION !== undefined
    ? process.env.DATABASE_CONNECTION
    : "";

// connecting to mongodb database
mongoose.set("strictQuery", false);

mongoose
  .connect(DB_CONNECTION, {
    autoIndex: true,
  } as ConnectOptions)
  .then(() => console.log(`Server is listening on port ${PORT}...`))
  .catch((err: MongoError) => console.error(err));

app.get("/", (res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Server is currently running",
  });
});

app.use(imageRouter);

app.listen(PORT, () => {
  console.log(`attempting to connect to mongodb...`);
});
