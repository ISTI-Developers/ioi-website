import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormFieldFile from "../fields/FormFieldFile";
import FormCardContent from "@/components/layout/FormCardContent";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUploadImage } from "@/hooks/useImageUrl";
import { useAddVideo } from "@/hooks/useVideo";


interface VideoFormProps {
    onSuccess?: () => void;
    projectId?: number;
}

function VideoForm({ onSuccess, projectId }: VideoFormProps) {

    const form = useForm({
        defaultValues: {
            file: undefined,
        },
        mode: "all",
    });


    const [files, setFiles] = useState<File[]>([]);
    const { upload, loading } = useUploadImage();

    const { mutate } = useAddVideo();

    const onSubmit = async (values: any) => {
        if (!files[0]) return;

        try {
            const videoUrl = await upload(files[0], "videos");
            console.log(values);

            mutate(
                {
                    project_id: projectId,
                    file: videoUrl,
                },

                {
                    onSuccess: () => {
                        form.reset();
                        setFiles([]);
                        onSuccess?.();
                    },
                    onError: (err) => {
                        console.error("Failed to save video", err);
                    },
                }
            );

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
                <FormCardContent title="Add a new video">

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
                        Save Video
                    </Button>
                </div>


            </form>
        </Form>
    )
}

export default VideoForm;

