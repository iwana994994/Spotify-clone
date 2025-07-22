import User from "../models/user.model.js";
export const authCollback=async (req, res) => 
    {
 console.log("📥 Primljen user od frontenda:", req.body);

    const{id,firstName,lastName,imageUrl} = req.body
    console.log("📥 Primljen user od frontenda:", req.body.id);
    
  
    try {
       let user = await User.findOne({clerkId: id})
        if(!user){
            user = await User.create({
               clerkId: id, // ➕ DODAJ OVO!
               
                imageUrl: imageUrl,
                fullname: `${firstName} ${lastName}`,
                
            })
        }
        console.log("🆕 Sačuvan korisnik u MongoDB:", user);
        res.status(200).json({success:true})
         
    } catch (error) {
    console.error("❌ Greška pri čuvanju korisnika:", error.message);
      console.error(error.stack);
      
    res.status(500).json({ message: "Internal Server Error" });
}
} 