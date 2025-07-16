import { Skeleton } from "../ui/skeleton"


const PlayListsSkeleton = () => {
  return Array.from({ length: 7 }).map((_, index) => (
    <div key={index} className="flex items-center justify-between p-4 rounded-lg mb-2">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
   
    </div>))
}

export default PlayListsSkeleton