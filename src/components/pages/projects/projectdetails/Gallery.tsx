import { useState } from "react";
import { useGallery, useAddGallery } from "@/hooks/useGallery";
import type { BlockType, Gallery } from "@/data/types";
import { Button } from "@/components/ui/button";
import UploadBox from "@/components/ui/upload-box";
import FirebaseMedia from "@/components/ui/firebase-media";
import { useUploadImage } from "@/hooks/useImageUrl";
import { getGridHeights } from "@/lib/galleryUtils";
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

  const [blocks, setBlocks] = useState<Block[]>([]);

  const { mutate } = useAddGallery();
  const { upload } = useUploadImage(); 


  const { data: galleryData, isLoading: loadingGallery } = useGallery(projectId);
  if (loadingGallery) return <p>Loading gallery...</p>;
  const galleryArray = Array.isArray(galleryData?.gallery) ? galleryData.gallery : [];

  const groupedGallery = groupGalleryItems(galleryArray);

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

  const handleSaveGallery = async () => {
  try {

    for(let blockIndex = 0; blockIndex < blocks.length; blockIndex++) {
      const block = blocks[blockIndex];

      const validImages = block.images.filter((img) => img !== null);

      for (let index = 0; index < validImages.length; index++) {
        const file = validImages[index];
        const imageUrl = await upload(file, "project_gallery");
      
        mutate(
          {
            project_id: projectId,
            layout_group: block.layout_group,
            columns: block.images.length,
            display_order: index + 1,
            file: imageUrl,
          },
          {
            onSuccess: () => {
              setBlocks([]);
              onSuccess?. ();
            },
            onError:(err) => {
              console.error("Failed to save image", err);
            },
          }
        );
      }
      
    }
  
  } catch (err) {
    console.error("Submit failed", err);
  }
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


      <div className="mt-20 space-y-8">
        {Object.values(groupedGallery).map((group, idx) => {
          const columns = group[0]?.columns || 1;
          return (
            <div key={idx} className={`grid ${getGridCols(columns)} gap-5`}>
              {group.map(item => {
                const files: string[] = Array.isArray(item.file) ? item.file : [item.file].filter(Boolean) as string[];

                return files.map((filePath: string, i: number) => (
                  <FirebaseMedia
                    key={`${item.gallery_id}-${i}`}
                    path={filePath}
                    alt="Gallery"
                    className={`w-full ${getGridHeights(columns)} rounded-lg`}
                  />
                ));
              })}
            </div>
          );
        })}
      </div>

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