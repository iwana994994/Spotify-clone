import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useMusicStore } from "@/store/useMusicStore"
import {  Trash } from "lucide-react"
import { useEffect } from "react"


const AlbumTable = () => {
  const {fetchAlbums,albums,deleteAlbum}=useMusicStore()
  useEffect(() => {
    fetchAlbums()
  }, [fetchAlbums])
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
        {albums.map((album) => (
          <TableRow key={album._id}>
            <TableCell></TableCell>
            <TableCell className="font-medium">
                <img src={album.imageUrl} alt={album.title} className="w-20 h-20 rounded-lg" />
            </TableCell>
            <TableCell>{album.title}</TableCell>
            
           
            <TableCell>
              <Button onClick={() => deleteAlbum(album._id)}>
                <Trash />
              </Button>
              </TableCell>
            <TableCell>{album.createdAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>

  </Table>
  )
}

export default AlbumTable