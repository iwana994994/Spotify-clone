import { Router } from "express";
import { protectedRoute, requireAdmin } from "../middlwere/auth.middlwere.js";
import { createSong, deleteSong,createAlbum,deleteAlbum,checkAdmin } from "../controller/admin.controller.js";
const router = Router();
router.use(protectedRoute, requireAdmin);

router.get("/checkAdmin", checkAdmin);

router.post("/songs", createSong);
router.delete("/songs/:id",deleteSong);

router.post("/albums", createAlbum);
router.delete("/albums/:id",  deleteAlbum); 
export default router;