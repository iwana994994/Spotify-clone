import User from "../models/user.model.js";
export const getAllUsers =async (req, res) => {

try {
     const currentUser = req.auth();
    const users = await User.find({clerkId: {$ne: currentUser}})
    res.status(200).json(users);
}
catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
}

}

