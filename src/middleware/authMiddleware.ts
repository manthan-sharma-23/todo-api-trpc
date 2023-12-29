import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { secretKey } from "..";

export interface customRequest extends Request {
  userId: number;
}

interface JwtPayload {
  id: number;
}

export async function userAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let token = req.header("Authorization");
    if (!token) return res.status(402).json({ message: "Access Denied" });
    if (token.startsWith("Bearer ")) token = token.split(" ")[1];

    const payload = jwt.verify(token, secretKey) as JwtPayload;
    (req as customRequest).userId = payload.id;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
