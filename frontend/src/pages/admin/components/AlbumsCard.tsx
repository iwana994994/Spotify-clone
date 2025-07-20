import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AlbumTable from "./AlbumTable.tsx"


const AlbumsCard = () => {
  return (
   <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>All albums</CardTitle>
      
      </CardHeader>
      <CardContent>
        <AlbumTable/>
      </CardContent>
      </Card>
  )
}

export default AlbumsCard