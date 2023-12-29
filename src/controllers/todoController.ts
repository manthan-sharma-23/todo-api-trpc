import { Request, Response } from "express";
import { customRequest } from "../middleware/authMiddleware";
import { prisma } from "../db";

export async function allTodos(req: Request, res: Response) {
  try {
    const id = (req as customRequest).userId;
    const todos = await prisma.todo.findMany({
      where: {
        userId: id,
        active: true,
      },
    });

    return res.status(202).json(todos);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
}

export async function createTodo(req: Request, res: Response) {
  try {
    const { title, description } = req.body;
    const id = (req as customRequest).userId;

    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        userId: id,
      },
    });

    return res.status(202).json({
      title: todo.title,
      description: todo.description,
      done: todo.done,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
}

export async function updateTodo(req: Request, res: Response) {
  try {
    const { todoId } = req.params;
    const { title, description, done } = req.body;
    const todo = await prisma.todo.update({
      where: {
        id: Number(todoId),
        active: true,
      },
      data: {
        title,
        description,
        done,
      },
    });

    return res.status(202).json({
      title: todo.title,
      description: todo.description,
      done: todo.done,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
}

export async function deleteTodo(req: Request, res: Response) {
  try {
    let { todoId } = req.params;


    const todo = await prisma.todo.update({
      where: {
        id: Number(todoId),
        active: true,
      },
      data: {
        active: false,
      },
    });

    console.log(todo);

    return res.status(203).json({ message: "Deleted Succesfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error dlt" });
  }
}
