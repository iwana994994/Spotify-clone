import { clerkClient } from "@clerk/express";

export const protectedRoute = (req, res, next) => {
    if (!req.auth || !req.auth.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next(); // nastavi ako je korisnik autentifikovan
}
export const requireAdmin = async (req, res, next) => {
    try {
        const userId = req.auth?.userId; // 👈 uzmi userId iz req.auth
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const currentUser = await clerkClient.users.getUser(userId);

        const userEmail = currentUser.emailAddresses?.[0]?.emailAddress; // 👈 izvući email
        const isAdmin = process.env.ADMIN_EMAIL === userEmail;

        console.log("isAdmin:", isAdmin);

        if (!isAdmin) {
            return res.status(403).json({ message: "Email address doesn't match admin" });
        }

        next(); // ✅ ako jeste admin, nastavi dalje
    } catch (error) {
        console.error("Error checking admin status:", error);
        return res.status(500).json({ message: "Server error while checking admin" });
    }
};
