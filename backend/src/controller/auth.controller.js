import User from "../models/user.model.js";
export const authCollback=async (req, res) => 
    {
 console.log("📥 Primljen user od frontenda:", req.body);

    const{id,firstName,lastName,imageUrl} = req.body
    try {
       const user = await User.findOne({clerkId: id})
        if(!user){
            user = await User.create({
                clerkId: id,
                imageUrl: imageUrl,
                fullname: `${firstName} ${lastName}`,
                
            })
        }
        console.log("🆕 Sačuvan korisnik u MongoDB:", user);
        res.status(200).json({success:true})
         
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
    }
} 