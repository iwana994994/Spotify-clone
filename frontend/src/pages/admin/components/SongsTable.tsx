import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useMusicStore } from "@/store/useMusicStore"
import { Trash } from "lucide-react"

import { useEffect } from "react"


const SongsTable = () => {
    const {songs,deleteSong,fetchSongs}=useMusicStore()
    useEffect(() => {
        fetchSongs()
    
    }, [fetchSongs])
  return (
  <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">#</TableHead>
          <TableHead ></TableHead>
          <TableHead> Name</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead >Created</TableHead>
          <TableHead ></TableHead>
        </TableRow>
      </TableHeader>
       <TableBody>
        {songs.map((song) => (
          <TableRow key={song._id}>
            <TableCell></TableCell>
            <TableCell className="font-medium">
                <img src={song.imageUrl} alt={song.title} className="w-20 h-15 rounded-lg" />
            </TableCell>
            <TableCell>{song.title}</TableCell>
            <TableCell>{song.duration}</TableCell>
            <TableCell>{song.createdAt.split("T")[0]}</TableCell>
             
            <TableCell>
              <Button onClick={() => deleteSong(song._id)}>
                <Trash />
              </Button>
              </TableCell>
          </TableRow>
        ))}
      </TableBody>

  </Table>
  )
}

export default SongsTable