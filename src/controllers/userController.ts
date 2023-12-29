import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../db";
import { Request, Response } from "express";
import { secretKey } from "..";
import { customRequest } from "../middleware/authMiddleware";

export async function userSignup(req: Request, res: Response) {
  try {
    let { name, email, password } = req.body;

    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user?.active)
      return res
        .status(402)
        .json({ message: "Please reactivate your user account" });
    if (user) return res.status(402).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    const token = jwt.sign({ id: user.id }, secretKey);
    return res
      .status(202)
      .json({ message: "User created successfully", token });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
}

export async function userLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user)
      return res
        .status(402)
        .json({ message: "User not Found Please Register First" });

    if (!user.active)
      return res.status(401).json({ message: "Please activate your account" });

    const compare = await bcrypt.compare(password, user.password);
    if (!compare)
      return res
        .status(403)
        .json({ message: "Enter the credentials correctly" });

    const token = await jwt.sign({ id: user.id }, secretKey);

    return res.status(203).json({ message: "Logged in successfully", token });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const id = (req as customRequest).userId;

    const user = await prisma.user.findUnique({
      where: {
        id,
        active: true,
      },
      select: {
        name: true,
        email: true,
        todos: {
          where: {
            active: true,
          },
          select: {
            title: true,
            description: true,
            done: true,
          },
        },
      },
    });

    if (!user) return res.status(402).json({ message: "Please register" });

    return res.status(203).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
}

export async function activateUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user)
      return res
        .status(402)
        .json({ message: "User not Found Please Register First" });

    const compare = await bcrypt.compare(password, user.password);
    if (!compare)
      return res
        .status(403)
        .json({ message: "Enter the credentials correctly" });

    const token = await jwt.sign({ id: user.id }, secretKey);

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        active: true,
      },
    });

    return res
      .status(202)
      .json({ message: "user account activated successfully", token });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
}
export async function deleteUser(req: Request, res: Response) {
  try {
    const id = (req as customRequest).userId;

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });

    return res
      .status(202)
      .json({ message: "user account deactivated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
}
