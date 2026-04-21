import { useState } from "react";
import FormSheet from "@/components/layout/FormSheet";
import FormSheetTrigger from "@/components/ui/form-sheet-trigger";
import { SheetTrigger } from "@/components/ui/sheet";
import GalleryForm from "../../forms/create/GalleryForm";
import FirebaseMedia from "@/components/ui/firebase-media";
import { SquarePen, Trash2 } from "lucide-react";
import { useDeleteGallery, useGallery } from "@/hooks/useGallery";
import { useMe } from "@/hooks/useAuth";
import GlassIconButton from "@/components/ui/button-glass";
import { Plus } from "lucide-react";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "@/firebase";
import DeleteDialog from "@/components/layout/DeleteDialog";

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

  const { mutate: deleteGallery } = useDeleteGallery();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteFile, setDeleteFile] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState(false);


  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      //delete from Firebase storage
      if (deleteFile) {
        const fileRef = ref(storage, deleteFile);
        await deleteObject(fileRef).catch(() => {
          console.warn("File already deleted or not found");
        });
      }
      //delete from database
      deleteGallery(deleteId, {
        onSuccess: () => {
          onSuccess?.();

          // reset state
          setOpenDelete(false);
          setDeleteId(null);
          setDeleteFile(null);
        },
      });
    } catch (err) {
      console.error("Delete failed", err);
    }
  };


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

      <div className="columns-2 md:columns-3 lg:columns-3 gap-2">
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
                <GlassIconButton
                  onClick={() => {
                    setDeleteId(item.gallery_id ?? null); 
                    setDeleteFile(item.file ?? null);
                    setOpenDelete(true);
                  }}
                >
                  <Trash2 />
                </GlassIconButton>
              </div>
            )}
          </div>
        ))}
      </div>

      <DeleteDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        handleConfirm={handleDelete}
      />
    </div>

  )
}