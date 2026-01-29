import { registrar, login } from "../controllers/userController.js";
import { Router } from "express";

const router = Router();

router.post("/registrar", registrar);
router.post("/login", login);

export default router;