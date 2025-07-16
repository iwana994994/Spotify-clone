import  Album  from "../models/album.model.js"; // Adjust the import based on your project structure
export const getAlbums = async(req, res) => {

    try {
        const albums = await Album.find(); // Assuming you have an Album model
        res.status(200).json(albums);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching albums" });
    }


}
export const getAlbumById = async(req, res) => {
try{
    const {id}= req.params;
    const album= await Album.findById(id).populate("songs")// Assuming you have an Album model

    if (!album) {
        return res.status(404).json({ message: "Album not found" });
    }  
    res.status(200).json(album);
}

catch (error) {
    res.status(500).json({ message: "Error fetching album" }); 
}
}