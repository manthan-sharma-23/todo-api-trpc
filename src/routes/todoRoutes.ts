import { Router, Request, Response } from "express";
import { userAuth } from "../middleware/authMiddleware";
import {
  allTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from "../controllers/todoController";

const router = Router();

router.get("/", userAuth, allTodos);
router.post("/push", userAuth, createTodo);
router.patch("/update/:todoId", userAuth, updateTodo);
router.delete("/delete/:todoId", userAuth, deleteTodo);

export default router;
