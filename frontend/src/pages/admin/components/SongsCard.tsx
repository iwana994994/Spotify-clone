import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SongsTable from "./SongsTable.tsx"
import AddSongDialog from "./AddSongDialog.tsx"



const SongsCard = () => {

  return (
    <Card className="w-80% h-full">
      <CardHeader className="flex justify-between">
        <CardTitle>All songs</CardTitle>
        <div  className="flex justify-end items-end">
           <AddSongDialog/>
        </div>
         
      </CardHeader>
      <CardContent>
        <SongsTable/>
      </CardContent>
      </Card>
  )
}

export default SongsCard