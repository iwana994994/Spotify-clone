import { ResizablePanel, ResizablePanelGroup,ResizableHandle } from '@/components/ui/resizable'
import { Outlet } from 'react-router-dom'
import LeftSideBar from './components/LeftSideBar'


const MainLayout = () => {
  return (
   <div className='flex h-screen w-screen flex-col bg-zinc-900 text-white'>
<ResizablePanelGroup direction="horizontal" className="h-full">
<ResizablePanel defaultSize={20} maxSize={30} minSize={10} className="bg-zinc-800">
    <LeftSideBar />
</ResizablePanel>
<ResizableHandle className="bg-zinc-800 w-px" />

<ResizablePanel defaultSize={80}  className="bg-zinc-900 flex flex-col">
    <Outlet />
</ResizablePanel>
<ResizableHandle className="bg-zinc-800 w-px" />

<ResizablePanel defaultSize={20} maxSize={25} minSize={0} className="bg-zinc-800">
    right side
</ResizablePanel>

</ResizablePanelGroup>

   </div>
  )
}

export default MainLayout