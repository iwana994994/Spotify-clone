import  Song  from "../models/song.model.js";
import  Album  from "../models/album.model.js";
export const createSong = async (req, res) => {

const uploadCloudinaru = async (file) => {

    try {
  const resolt= await cloudinary.uploader.upload(file.path, {
    resource_type: "auto"})
    return resolt.secure_url;}
    catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        throw new Error("File upload failed");
    }

};


try {
if(!req.files||!req.file.audiofile||!req.file.imagefile) {
    return res.status(400).json({ message: "Please provide audio and image files." });
  } 
const { title, duration, artist, albumId } = req.body;
const{audiofile}  = req.file.audiofile;
const {imagefile} = req.file.imagefile;

const imageUrl= await uploadCloudinaru(imagefile)
const audioUrl = await uploadCloudinaru(audiofile);
    
        const song = new Song({
        title,
        duration,
        artist,
        imageUrl,
        audioUrl,
        albumId: albumId || null,
        });
    
        // Assuming you have a Song model to save the song
       await song.save();

if(albumId){
    await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id }
    });
}

        res.status(201).json(song);
    } catch (error) {
        console.error("Error creating song:", error);
        res.status(500).json({ message: "Internal server error" });
    }



}
export const deleteSong = async (req, res) => {
    try {
    const { id } = req.params;

    const song = await Song.findById(id);
    
     
        // If the song is part of an album, remove it from the album's songs array
        if (song.albumId) {
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: { songs: song._id }
            });
        }
        song = await Song.findByIdAndDelete(id);

        res.status(200).json({ message: "Song deleted successfully" });
    } catch (error) {
        console.error("Error deleting song:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const createAlbum = async (req, res) => {
    try {
        const { title, artist, releaseDate } = req.body;
        const { imagefile } = req.file;
        const imageUrl = await uploadCloudinaru(imagefile);

        const album = new Album({
            title,
            artist,
            releaseDate,
        });

        await album.save();
        res.status(201).json(album);
    } catch (error) {
        console.error("Error creating album:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const deleteAlbum = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the album by ID and delete it
         await Song.deleteMany({ albumId: id });
        const album = await Album.findByIdAndDelete(id);

        if (!album) {
            return res.status(404).json({ message: "Album not found" });
        }

        res.status(200).json({ message: "Album deleted successfully" });
    } catch (error) {
        console.error("Error deleting album:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const checkAdmin = (req, res) => {
    res.status(200).json({ message: "You are an admin" });
}