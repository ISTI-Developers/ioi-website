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
  showAdd?: boolean;

}



export default function Gallery({ projectId, onSuccess, showAdd = true }: GalleryProps) {

  const { data, isLoading } = useGallery(projectId);
  const gallery = (data?.gallery ?? []).sort((a, b) => a.position - b.position);
  if (isLoading) return <div>Loading...</div>;

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
      
    <div className="space-y-4">

  <div className="scale-100 origin-center">
    <div className="grid grid-cols-3 auto-rows-auto gap-2">
      {gallery.map((item) => (
        <div
          key={item.gallery_id}
          className={`
            ${getBentoClass(gallery.length, item.position)}
            relative rounded-md overflow-hidden bg-muted
          `}
        >
          <FirebaseMedia
            path={item.file}
            className="w-full h-full object-contain"
          />
        </div>
      ))}
    </div>
  </div>

</div>
    </div>
  )



}