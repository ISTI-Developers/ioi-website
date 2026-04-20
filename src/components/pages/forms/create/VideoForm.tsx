import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormFieldFile from "../fields/FormFieldFile";
import FormCardContent from "@/components/layout/FormCardContent";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUploadImage } from "@/hooks/useImageUrl";
import { useAddVideo, useUpdateVideo } from "@/hooks/useVideo";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "@/firebase";


interface VideoFormProps {
    onSuccess?: () => void;
    projectId?: number;
    videoId?: number;
    defaultFile?: string;
}

function VideoForm({ onSuccess, projectId, videoId, defaultFile }: VideoFormProps) {

    const isEditing = !!videoId;

    const form = useForm({
        defaultValues: {
            file: undefined,
        },
        mode: "all",
    });


    const [files, setFiles] = useState<File[]>([]);
    const { upload, loading } = useUploadImage();

    const { mutate: addVideo } = useAddVideo();
    const { mutate: updateVideo } = useUpdateVideo();

    const onSubmit = async (values: any) => {
        try {
            let videoUrl: string | undefined = defaultFile;

            if (files[0]) {
                if (defaultFile) {
                    const oldRef = ref(storage, defaultFile);
                    await deleteObject(oldRef).catch((err) => {
                        console.warn("Old image not found or already deleted", err);
                    });
                }
                videoUrl = (await upload(files[0], "gallery")) ?? undefined;
            }

            if (!videoUrl) return;

               if (isEditing) {
                updateVideo(
                    { id: videoId, data: { file: videoUrl } },
                    {
                        onSuccess: () => {
                            form.reset();
                            setFiles([]);
                            onSuccess?.();
                        },
                        onError: (err) => {
                            console.error("Failed to update video ", err);
                        },
                    }
                );
            } else {
                addVideo(
                    { project_id: projectId, file: videoUrl },
                    {
                        onSuccess: () => {
                            form.reset();
                            setFiles([]);
                            onSuccess?.();
                        },
                        onError: (err) => {
                            console.error("Failed to save video image", err);
                        },
                    }
                );
            }
        } catch (err) {
            console.error("Submit failed", err);
        }
    };


    return (
        <Form {...form}>
            <form
                id="video-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
                encType="multipart/form-data"

            >
                <FormCardContent title={isEditing ? "Update Video" : "Add New video"}>
                    <FormFieldFile
                        multiple={false}
                        control={form.control}
                        name="file"
                        label="Videos"
                        placeholder="Upload videos"
                        files={files}
                        setFiles={setFiles}
                        accept="video/*"
                    />
                </FormCardContent>


                <div className="pb-6">
                    <Button
                        className="w-full flex items-center justify-center rounded-xl p-6"
                        type="submit"
                    >
                        {isEditing ? "Update Video" : "Save Video"}
                    </Button>
                </div>


            </form>
        </Form>
    )
}

export default VideoForm;

