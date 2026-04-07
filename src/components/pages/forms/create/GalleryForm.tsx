import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormFieldFile from "../fields/FormFieldFile";
import FormCardContent from "@/components/layout/FormCardContent";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUploadImage } from "@/hooks/useImageUrl";
import { useAddGallery } from "@/hooks/useGallery";


interface GalleryFormProps {
    projectId?: number;
    onSuccess?: () => void;
}

function GalleryForm({ onSuccess, projectId }: GalleryFormProps) {

    const form = useForm({
        defaultValues: {
            file: undefined
        },
        mode: "all",
    });

    const [files, setFiles] = useState<File[]>([]);
    const { upload, loading } = useUploadImage();

    const { mutate } = useAddGallery();


    const onSubmit = async (values: any) => {
        try {
            const imageUrl = await upload(files[0], "gallery")
            console.log(values);

            mutate(
                {
                    project_id: projectId,
                    file: imageUrl,
                },

                {
                    onSuccess: () => {
                        form.reset();
                        setFiles([]);
                        onSuccess?.();
                    },
                    onError: (err) => {
                        console.error("Failed to save gallery image", err);
                    },
                }
            )
        } catch (err) {
            console.error("Submit failed", err);
        }
    };


    return (
        <Form {...form} >
            <form
                id="gallery-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
                encType="multipart/form-data"
            >

                <FormCardContent title="Add new Image">
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
                    >
                        Save Gallery
                    </Button>
                </div>
            </form>
        </Form>

    );
}

export default GalleryForm;