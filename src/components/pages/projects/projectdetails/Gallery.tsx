import FormSheet from "@/components/layout/FormSheet";
import FormSheetTrigger from "@/components/ui/form-sheet-trigger";
import { SheetTrigger } from "@/components/ui/sheet";
import GalleryForm from "../../forms/create/GalleryForm";
import FirebaseMedia from "@/components/ui/firebase-media";
import { SquarePen, Trash2 } from "lucide-react";
import { useGallery } from "@/hooks/useGallery";
import { useMe } from "@/hooks/useAuth";
import GlassIconButton from "@/components/ui/button-glass";
import { Plus } from "lucide-react";



interface GalleryProps {
  projectId: number;
  onSuccess?: () => void;
  showAdd?: boolean;

}



export default function Gallery({ projectId, onSuccess, showAdd = true }: GalleryProps) {
  const { data: auth } = useMe();
  const isAdmin = auth?.user?.role === "admin";

  const { data, isLoading } = useGallery(projectId);
  const gallery = (data?.gallery ?? []).sort((a, b) => a.position - b.position);


  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      {showAdd && isAdmin && (
        <div className="flex justify-end">
          <FormSheet
            type="Gallery"
            taskName="Add a New"
            button={<FormSheetTrigger icon={Plus} buttonName="New" name="Add" />}
            form={<GalleryForm projectId={projectId} onSuccess={onSuccess} />}
          />
        </div>
      )}

      <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
        {gallery.map((item) => (
          <div
            key={item.gallery_id}
            className="group relative mb-2 break-inside-avoid rounded-md overflow-hidden"
          >
            
            <FirebaseMedia
              path={item.file}
              className="w-full h-auto object-cover"
            />

            {isAdmin && (
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4 pointer-events-auto">
                <FormSheet
                  type="Gallery"
                  taskName="Update"
                  button={
                    <SheetTrigger >
                      <GlassIconButton>
                        <SquarePen />
                      </GlassIconButton>
                    </SheetTrigger>
                  }
                  form={
                    <GalleryForm
                      projectId={projectId}
                      galleryId={item.gallery_id}
                      defaultFile={item.file ?? undefined}
                      onSuccess={onSuccess}
                    />
                  }
                />
                <GlassIconButton>
                  <Trash2 />
                </GlassIconButton>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  )



}