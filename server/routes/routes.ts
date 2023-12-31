import { userLogin, userSignup } from "../controllers/userController";
import { router } from "../procedures/trpc";

export const userRouter = router({
  register: userSignup,
  login: userLogin,
});

export const todoRouter = router({});
