import { useState } from "react";
import FormSheet from "@/components/layout/FormSheet";
import FormSheetTrigger from "@/components/ui/form-sheet-trigger";
import GalleryForm from "../../forms/create/GalleryForm";
import FirebaseMedia from "@/components/ui/firebase-media";

import { useGallery } from "@/hooks/useGallery";
import { Plus } from "lucide-react";

import { getBentoClass } from "@/lib/galleryUtils";


interface GalleryProps {
  projectId: number;
  onSuccess?: () => void;
}



export default function Gallery({ projectId, onSuccess }: GalleryProps) {

  const { data, isLoading } = useGallery(projectId);
  const gallery = data?.gallery ?? [];

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <FormSheet
          type="Gallery"
          taskName="Add a New"
          button={<FormSheetTrigger icon={Plus} buttonName="New" name="Add" />}
          form={<GalleryForm projectId={projectId} onSuccess={onSuccess} />}

        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {gallery.map((item) => (
          <div
            key={item.gallery_id}
            className={getBentoClass(gallery.length, item.position)}

          >
            <FirebaseMedia
              path={item.file}
              alt={`Gallery item ${item.gallery_id}`}
            />

          </div>
        ))}

      </div>
    </div>


  )



}