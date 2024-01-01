import * as trpcExpress from "@trpc/server/adapters/express";
import jwt from "jsonwebtoken";
import { appConfig } from "../configs/config.app";

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  let token = req.headers["authorization"] as string;
  if (token?.startsWith("Bearer ")) token = token.split(" ")[1];

  const id = jwt.verify(token, appConfig.secretKey);

  return {
    id,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
