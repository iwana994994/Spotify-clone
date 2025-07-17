import { clerkClient } from "@clerk/express";

export const protectedRoute =  (req, res, next) => {
    if(!req.auth()) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
}

export const requireAdmin= async (req, res, next) => {
    try{
    const currentUser = await clerkClient.users.getUser(req.auth());
    const isAdmin= process.env.ADMIN_EMAIL=== currentUser.emailAddresses?.emailAddress;

    if(!isAdmin) 
        return res.status(403).json({ message: "Forbidden" });
}
catch(error) {
    console.error("Error checking admin status:", error);  }
}