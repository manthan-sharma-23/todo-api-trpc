import { initTRPC } from "@trpc/server";
import { PrismaClient } from "@prisma/client";
import { userAuthMiddlware } from "../middleware/authMiddleware";
import bcrypt from "bcryptjs";
import { UnauthorizedRouteError } from "../utils/error";

interface Context {
  user?: {
    id: number;
  };
}
const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = publicProcedure.use(async (opts) => {
  const { ctx } = opts;
  if(!ctx.user){
    throw UnauthorizedRouteError();
  }
//   let token = req.header("Authorization");
//   if (!token) return res.status(402).json({ message: "Access Denied" });
//   if (token.startsWith("Bearer ")) token = token.split(" ")[1];

//   const payload = jwt.verify(token, secretKey) as JwtPayload;
//   (req as customRequest).userId = payload.id;
//   next();
  
  return opts.next({
    ctx: {
      user: ctx.user,
    },
  });
});

// db ORM stuff
export const prisma = new PrismaClient();
