import { useState } from "react";
import { useGallery, useAddGallery } from "@/hooks/useGallery";
import type { BlockType, Gallery } from "@/data/types";
import { API_BASE_URL } from "@/hooks/api/config";
import { Button } from "@/components/ui/button";
import UploadBox from "@/components/ui/upload-box";
import { Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { groupGalleryItems, getGridCols } from "@/lib/galleryUtils";

interface GalleryProps {
  projectId: number;
  onSuccess?: () => void;
}

interface Block {
  id: number;
  type: BlockType;
  images: (File | null)[];
  layout_group: number;
}

export default function Gallery({ projectId, onSuccess }: GalleryProps) {

  const { data, isLoading, error } = useGallery(projectId);
  const [blocks, setBlocks] = useState<Block[]>([]);
  
  const { mutate } = useAddGallery();

  
  const baseUrl = API_BASE_URL;

  if (isLoading) return <p>Loading gallery...</p>;
  if (error) return <p>Error loading gallery</p>;

  const galleryArray: Gallery[] = Array.isArray(data?.gallery) ? data.gallery : [];
  const grouped = groupGalleryItems(galleryArray);

 const addBlock = (type: BlockType) => {
  const existingGroups = galleryArray.map(item => item.layout_group || 0);
  const maxGroup = existingGroups.length ? Math.max(...existingGroups) : 0;

  const imageCount =
    type === "single" ? 1 :
    type === "grid_2" ? 2 :
    type === "grid_3" ? 3 : 4;

  setBlocks(prev => [
    ...prev,
    { id: Date.now(), type, images: Array(imageCount).fill(null), layout_group: maxGroup + 1 },
  ]);
};



  const handleUpload = (blockId: number, index: number, file: File) => {
    setBlocks(prev =>
      prev.map(block =>
        block.id === blockId
          ? {
            ...block,
            images: block.images.map((img, i) => (i === index ? file : img)),
          }
          : block
      )
    );
  };

const handleSaveGallery = () => {
  blocks.forEach(block => {
    mutate(
      {
        data: {
          project_id: projectId,
          layout_group: block.layout_group,
          columns: block.images.length,
          display_order: 1,
        },
        file: block.images.filter((img): img is File => img !== null),
      },
      {
        onSuccess: () => {
          console.log("Block uploaded:", block.layout_group);
        },
        onError: (err) => {
          console.error("Upload failed:", err);
        },
      }
    );
  });

  setBlocks([]);
  onSuccess?.();
};
  return (
    <div className="space-y-8 mt-6">
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="justify-start gap-1 rounded-full opacity-50">
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

      <h2 className="text-lg font-bold">Gallery</h2>

      {Object.values(grouped).map((group, index) => {
        const columns = group[0]?.columns || 1;
        return (
          <div key={index} className={`grid ${getGridCols(columns)} gap-4`}>
            {group.map(item =>
              item.file ? (
                <img
                  key={item.gallery_id}
                  src={`${baseUrl.replace(/\/$/, "")}/${item.file.replace(/^\/+/, "")}`}
                  alt={`Gallery ${item.gallery_id}`}
                  className="w-full h-40 object-cover rounded-lg"
                />
              ) : (
                <div
                  key={item.gallery_id}
                  className="w-full h-40 bg-gray-200 rounded-lg border border-dashed border-gray-400 flex items-center justify-center"
                >
                  <span className="text-gray-500">Empty</span>
                </div>
              )
            )}
          </div>
        );
      })}

    {blocks.map(block => {
  const gridClass =
    block.type === "single"
      ? "grid-cols-1"
      : block.type === "grid_2"
      ? "grid-cols-2"
      : block.type === "grid_3"
      ? "grid-cols-3"
      : "grid-cols-4";

  return (
    <div key={block.id} className={`grid ${gridClass} gap-4`}>
      {block.images.map((img, idx) => (
        <UploadBox
          key={idx}
          file={img}
          onUpload={(file) => handleUpload(block.id, idx, file)}
        />
      ))}
    </div>
  );
})}

{blocks.length > 0 && (
  <div className="flex justify-end pt-6">
    <Button
      onClick={handleSaveGallery}
      className="px-6 py-2 rounded-xl"
    >
      Save Gallery
    </Button>
  </div>
)}
    </div>
  );
}