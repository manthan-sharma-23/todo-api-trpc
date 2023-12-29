import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import todoRoutes from "./routes/todoRoutes";

const app = express();

dotenv.config();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const secretKey = process.env.SECRET_KEY || "";
export const port = process.env.PORT || 3002;

app.use("/api/v1/user/", userRoutes);
app.use("/api/v1/todo/", todoRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
