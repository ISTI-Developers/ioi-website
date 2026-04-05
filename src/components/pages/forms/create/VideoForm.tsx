import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormFieldText from "../fields/FormFieldText";
import FormFieldTextArea from "../fields/FormFieldTextArea";
import FormFieldFile from "../fields/FormFieldFile";
import FormCardContent from "@/components/layout/FormCardContent";
import FormFieldDate from "../fields/FormFieldDate";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAddProject } from "@/hooks/useProjects";
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
            const { file } = values;

                    console.log("Sending:", { project_id: projectId, file: videoUrl }); // add this

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
                        label="Images"
                        placeholder="Upload images"
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

