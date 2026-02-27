import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";


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
}

export default function Gallery() {
    const [blocks, setBlocks] = useState<Block[]>([])

    const addBlock = (type: BlockType) => {
        setBlocks(prev => [
            ...prev,
            { id: Date.now(), type }
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
                    switch (block.type) {
                        case "single":
                            return (
                                <div key={block.id} className="flex justify-center">
                                    <div className="w-full h-40 bg-gray-200 rounded-xl flex items-center justify-center">
                                        Upload 1 Image
                                    </div>
                                </div>
                            )
                        case "grid_2":
                            return (
                                <div key={block.id} className="grid grid-cols-2 gap-4">
                                    <div className="h-40 bg-gray-200 rounded-xl" />
                                    <div className="h-40 bg-gray-200 rounded-xl" />
                                </div>
                            )
                        case "grid_3":
                            return (
                                <div key={block.id} className="grid grid-cols-3 gap-4">
                                    <div className="h-40 bg-gray-200 rounded-xl" />
                                    <div className="h-40 bg-gray-200 rounded-xl" />
                                    <div className="h-40 bg-gray-200 rounded-xl" />
                                </div>
                            )

                        case "grid_4":
                            return (
                                <div key={block.id} className="grid grid-cols-4 gap-4">
                                    <div className="h-40 bg-gray-200 rounded-xl" />
                                    <div className="h-40 bg-gray-200 rounded-xl" />
                                    <div className="h-40 bg-gray-200 rounded-xl" />
                                    <div className="h-40 bg-gray-200 rounded-xl" />
                                </div>
                            )

                        default:
                            return null
                    }
                })}
            </div>
        </div>
    );
}