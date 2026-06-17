import FormSheet from "@/components/layout/FormSheet";
import FormSheetTrigger from "@/components/ui/form-sheet-trigger";
import GalleryForm from "../pages/forms/create/GalleryForm";
import FirebaseMedia from "@/components/ui/firebase-media";
import type { Gallery } from "@/data/types";
import { Plus } from "lucide-react";

import { getBentoClass } from "@/lib/galleryUtils";


interface GalleryProps {
  gallery: Gallery[];
  projectId: number;
  onSuccess?: () => void;
  showAdd?: boolean;
  imageClassName?: string;
  renderItem?: (item: Gallery) => React.ReactNode;
}

export default function Gallery({ gallery, projectId, onSuccess, showAdd = true, imageClassName = "w-full h-100 object-cover object-top", renderItem }: GalleryProps) {
  return (
    <div className="space-y-4">
      {showAdd && (
        <div className="flex justify-end">
          <FormSheet
            type="Gallery"
            taskName="Add a New"
            button={<FormSheetTrigger icon={Plus} buttonName="New" name="Add" />}
            form={<GalleryForm projectId={projectId} onSuccess={onSuccess} />}
          />
        </div>
      )}
      <div className="grid grid-cols-4 grid-flow-dense gap-2">
        {gallery.map((item) => (
          <div
            key={item.gallery_id}
            className={`${getBentoClass(gallery.length, item.position)} relative rounded-md overflow-hidden`}
          >
            <FirebaseMedia
              path={item.file}
              alt={`Gallery item ${item.gallery_id}`}
              className={imageClassName}
            />
            {renderItem?.(item)}
          </div>
        ))}
      </div>
    </div>
  );
}