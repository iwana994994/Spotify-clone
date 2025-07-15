import { Router } from "express";
import { authCollback } from "../controller/auth.controller.js";

const router = Router();

router.post("/callback",authCollback)

export default router;