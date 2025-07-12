import { Router } from "express";
import { authCollback } from "../controller/auth.controller.js";

const router = Router();

router.post("/collback",authCollback)

export default router;