import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormFieldFile from "../fields/FormFieldFile";
import FormCardContent from "@/components/layout/FormCardContent";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUploadImage } from "@/hooks/useImageUrl";
import { useAddGallery, useUpdateGallery } from "@/hooks/useGallery";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "@/firebase";

interface GalleryFormProps {
  projectId?: number;
  galleryId?: number;
  defaultFile?: string;
  onSuccess?: () => void;
}

function GalleryForm({
  onSuccess,
  projectId,
  galleryId,
  defaultFile,
}: GalleryFormProps) {
  const isEditing = !!galleryId;
  const form = useForm({
    defaultValues: {
      file: undefined,
    },
    mode: "all",
  });

  const [files, setFiles] = useState<File[]>([]);
  const { upload, loading } = useUploadImage();

  const { mutate: addGallery } = useAddGallery();
  const { mutate: updateGallery } = useUpdateGallery();

  const onSubmit = async () => {
    try {
      let imageUrl: string | undefined = defaultFile;

      if (files[0]) {
        if (defaultFile) {
          const oldRef = ref(storage, defaultFile);
          await deleteObject(oldRef).catch((err) => {
            console.warn("Old image not found or already deleted", err);
          });
        }
        imageUrl = (await upload(files[0], "gallery")) ?? undefined;
      }

      if (!imageUrl) return;

      if (isEditing) {
        updateGallery(
          { id: galleryId, data: { file: imageUrl } },
          {
            onSuccess: () => {
              form.reset();
              setFiles([]);
              onSuccess?.();
            },
            onError: (err) => {
              console.error("Failed to update gallery image", err);
            },
          },
        );
      } else {
        addGallery(
          { project_id: projectId, file: imageUrl },
          {
            onSuccess: () => {
              form.reset();
              setFiles([]);
              onSuccess?.();
            },
            onError: (err) => {
              console.error("Failed to save gallery image", err);
            },
          },
        );
      }
    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  return (
    <Form {...form}>
      <form
        id="gallery-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
        encType="multipart/form-data"
      >
        <FormCardContent title={isEditing ? "Update Image" : "Add New Image"}>
          <FormFieldFile
            multiple={false}
            control={form.control}
            name="file"
            label="Images"
            placeholder="Upload images"
            files={files}
            setFiles={setFiles}
          />
        </FormCardContent>

        <div className="pb-6">
          <Button
            className="w-full flex items-center justify-center rounded-xl p-6"
            type="submit"
            disabled={loading}
          >
            {isEditing ? "Update Gallery" : "Save Gallery"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default GalleryForm;
