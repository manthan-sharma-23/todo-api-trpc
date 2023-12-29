import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import todoRoutes from "./routes/todoRoutes";

const app = express();

dotenv.config();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

export const secretKey = process.env.SECRET_KEY || "";
export const port = process.env.PORT || 3002;

app.get("/", (req, res) => {
  return res.send("hello world");
});

app.use("/api/v1/user/", userRoutes);
app.use("/api/v1/todo/", todoRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
