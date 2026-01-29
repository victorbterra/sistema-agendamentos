import { registrar } from "../controllers/userController.js";
import { Router } from "express";

const router = Router();

router.post("/registrar", registrar);

export default router;