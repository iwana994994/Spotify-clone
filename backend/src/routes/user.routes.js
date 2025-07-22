import { Router } from "express";
import { protectedRoute } from "../middlwere/auth.middlwere.js";
import { getAllUsers,getAllMessages } from "../controller/user.controller.js";

const router = Router();    

router.get("/",protectedRoute, getAllUsers);
router.get("messages/:id",protectedRoute, getAllMessages);


export default router;