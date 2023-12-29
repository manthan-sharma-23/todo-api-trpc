import { Router } from "express";
import { activateUser, deleteUser, getUser, userLogin, userSignup } from "../controllers/userController";
import { userAuth } from "../middleware/authMiddleware";

const router = Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.patch("/activate", activateUser);
router.delete("/delete", userAuth, deleteUser);
router.get("/", userAuth, getUser);

export default router;
