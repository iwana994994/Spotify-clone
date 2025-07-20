import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Upload } from "lucide-react";
import React, { useState } from "react"



const AddSongDialog = () => {
	

	const [files, setFiles] = useState<{ audio: File | null; image: File | null }>({
		audio: null,
		image: null,
	});


    const audioInputRef = React.useRef<HTMLInputElement>(null)
    const imageInputRef = React.useRef<HTMLInputElement>(null)
    
  return (
    <Dialog >
     
        <DialogTrigger >
          <Button variant="outline" className="bg-green-500 justify-end items-end">Add Song</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Song</DialogTitle>
           
          </DialogHeader>
          
          <div className="grid gap-4">
            <input type="file"
             accept="audio/*"
              hidden ref={audioInputRef  } 
             onChange={(e) => setFiles((prev) => ({ ...prev, audio: e.target.files![0] }))}/>
          
            	<input
						type='file'
						ref={imageInputRef}
						className='hidden'
						accept='image/*'
						onChange={(e) => setFiles((prev) => ({ ...prev, image: e.target.files![0] }))}
					/>
           {/* Upload image */}
            </div>
                       <div
						className='flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer'
						onClick={() => imageInputRef.current?.click()}
					>
						<div className='text-center'>
							{files.image ? (
								<div className='space-y-2'>
									<div className='text-sm text-emerald-500'>Image selected:</div>
									<div className='text-xs text-zinc-400'>{files.image.name.slice(0, 20)}</div>
								</div>
							) : (
								<>
									<div className='p-3 bg-zinc-800 rounded-full inline-block mb-2'>
										<Upload className='h-6 w-6 text-zinc-400' />
									</div>
									<div className='text-sm text-zinc-400 mb-2'>Upload artwork</div>
									<Button variant='outline' size='sm' className='text-xs'>
										Choose File
									</Button>
								</>
							)}
						</div>
					</div>
                    {/*Uplpad audio */}

              <div>
                <div onClick={() => audioInputRef.current?.click()}>
                  <div className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer">
                    
                      {files.audio ? (
                        <div className="space-y-2">
                          <div className="text-sm text-emerald-500">Audio selected:</div>
                          <div className="text-xs text-zinc-400">{files.audio.name.slice(0, 20)}</div>
                        </div>
                      ) : (
                        <>
                          <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                            <Upload className="h-6 w-6 text-zinc-400" />
                          </div>
                          <div className="text-sm text-zinc-400 mb-2">Upload audio</div>
                          <Button variant="outline" size="sm" className="text-xs">
                            Choose File
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
             
        
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
    
    </Dialog>
  )
}

export default AddSongDialog