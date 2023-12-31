import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { config } from "dotenv";
import { todoRouter, userRouter } from "./routes/routes";

// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

const appRouter = t.router({
  user: userRouter,
  todo: todoRouter,
});

const app = express();
config();
export const port = process.env.PORT || 4000;
export const secretKey = process.env.SECRET_KEY || "";

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(port);
