import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import UploadBox from "@/components/ui/upload-box";


import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type BlockType =
  | "single"
  | "grid_2"
  | "grid_3"
  | "grid_4"

interface Block {
  id: number
  type: BlockType
  images: (File | null)[]
}

export default function Gallery() {
  const [blocks, setBlocks] = useState<Block[]>([])

  const addBlock = (type: BlockType) => {

    const imageCount =
      type === "single" ? 1 :
        type === "grid_2" ? 2 :
          type === "grid_3" ? 3 :
            4

    setBlocks(prev => [
      ...prev,
      {
        id: Date.now(),
        type,
        images: Array(imageCount).fill(null)
      }
    ])
  }

  return (
    <div>
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="justify-start gap-1 rounded-full opacity-50"
            >
              <Plus className="h-4 w-4" /> Add Blocks
            </Button>
          </DropdownMenuTrigger>



          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => addBlock("single")}>Single Image</DropdownMenuItem>
            <DropdownMenuItem onClick={() => addBlock("grid_2")}>2 Image Grid</DropdownMenuItem>
            <DropdownMenuItem onClick={() => addBlock("grid_3")}>3 Image Grid</DropdownMenuItem>
            <DropdownMenuItem onClick={() => addBlock("grid_4")}>4 Image Grid</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>


      <div className="space-y-10 mt-6">
        <p>This is the gallery section.</p>
        {blocks.map(block => {
          const gridClass =
            block.type === "single"
              ? "grid-cols-1"
              : block.type === "grid_2"
                ? "grid-cols-2"
                : block.type === "grid_3"
                  ? "grid-cols-3"
                  : "grid-cols-4"


          return (
            <div key={block.id} className={`grid ${gridClass} gap-4`}>
              {block.images.map((img, index) => (
                <div key={index}>
                  {img ? (
                    <img
                      src={URL.createObjectURL(img)}
                      className="h-100 w-full object-cover rounded-xl"
                    />
                  ) : (
                    <UploadBox
                      onUpload={(file) => {
                        setBlocks(prev =>
                          prev.map(b =>
                            b.id === block.id
                              ? {
                                ...b,
                                images: b.images.map((i, iIndex) =>
                                  iIndex === index ? file : i
                                )
                              }
                              : b
                          )
                        )
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  );
}
