import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appConfig } from "./configs/config.app";
import { createContext } from "./procedures/trpc.context";
import { z } from "zod";
import { publicProcedure, router } from "./procedures/trpc.procedures";

const app = express();

const appRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation((opt) => {
      console.log(opt);
      console.log("hello");
      return {
        name:opt.input.name,
      };
    }),
});

export type Approuter = typeof appRouter;
app.use(
  "/",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(appConfig.port, () => {
  console.log(`Server running on port ${appConfig.port}`);
});
