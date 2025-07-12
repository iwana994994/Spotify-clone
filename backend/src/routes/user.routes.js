import { Router } from "express";

const router = Router();    

router.get("/", (req, res) => {
    // Logic to get user profile
    res.send("User profile");
});

export default router;