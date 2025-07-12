import User from "../models/user.model.js";
export const authCollback=async (req, res) => 
    {
    const{id,firstName,lastName,imageUrl} = req.body
    try {
       const user = await User.findOne({clarkId: id})
        if(!user){
            user = await User.create({
                clarkId: id,
                imageUrl: imageUrl,
                fullname: `${firstName} ${lastName}`,
                
            })
        }
        res.status(200).json({success:true})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
    }
} 