import { useState } from "react";
import { ProjectSchema } from "@/data/schemas";
import type { Project } from "@/data/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormFieldText from "../fields/FormFieldText";
import FormFieldTextArea from "../fields/FormFieldTextArea";
import FormFieldFile from "../fields/FormFieldFile";

import FormFieldDate from "../fields/FormFieldDate";
import FormCardContent from "@/components/layout/FormCardContent";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { compareObjects } from "@/lib/utils";
import { toast } from "sonner";
import { useUpdateProject } from "@/hooks/useProjects";
import { useUploadImage } from "@/hooks/useImageUrl";
import { X } from "lucide-react";


interface UpdateProjectFormProps {
    project: Project;
    onSuccess?: () => void;
}

function UpdateProjectForm({ project, onSuccess }: UpdateProjectFormProps) {
    const form = useForm<Project>({
        resolver: zodResolver(ProjectSchema),
        defaultValues: {
            ...project,
            file: undefined,

        },
        mode: "all",
    });

    const [files, setFiles] = useState<File[]>([]);
    const [keptFiles, setKeptFiles] = useState<string | string[] | null>(
        project.file ?? null
    );


    const { upload, loading } = useUploadImage();

    const { mutate } = useUpdateProject();

    const handleRemoveExisting = (url: string) => {
        setKeptFiles((prev) => {
            if (Array.isArray(prev)) return prev.filter((f) => f !== url);
            return null;
        });
    };

    const onSubmit = async (values: Project) => {
        const changed = compareObjects(project, values);

        if (Object.keys(changed).length === 0 && !files.length) {
            toast.info("No changes detected.");
            return;
        }

        try {
            let imageUrl: string | undefined;

            if (files?.[0]) {
                const result = await upload(files[0], "projects");
                imageUrl = result ?? undefined;
            }

            mutate(
                {
                    id: values.project_id as number,
                    data: {
                        ...changed,
                        ...(imageUrl && { file: imageUrl }),
                    },
                },
                {
                    onSuccess: () => {
                        toast.success("Successfully updated project.");
                        onSuccess?.();
                    },
                }
            );
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <Form {...form} >
            <form
                id="update-project-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="spcae-y-4"
                encType="multipart/form-data"
            >
                <FormCardContent title="Project Information">
                    <FormFieldText
                        control={form.control}
                        name="project_name"
                        label="Project Name*"
                        placeholder="e.g. Project IOI"
                    />
                    <FormFieldText
                        control={form.control}
                        name="project_type"
                        label="Project Type*"
                        placeholder="Campaign"
                    />
                    <FormFieldText
                        control={form.control}
                        name="project_category"
                        label="Project Category*"
                        placeholder="Content Development"
                    />
                    <div className=" gap-4 sm:flex sm:gap-x-5">
                        <FormFieldDate
                            control={form.control}
                            name="start_date"
                            label="Start Date*"
                        />
                        <FormFieldDate
                            control={form.control}
                            name="end_date"
                            label="End Date*"
                        />
                    </div>
                </FormCardContent>

                <FormCardContent title="Team Role & Details">

                    <FormFieldTextArea
                        control={form.control}
                        name="company_description"
                        label="Company Description*"
                        placeholder="Brief description of the company, its industry, and any relevant background information that provides context for the project."
                    />
                    <FormFieldTextArea
                        control={form.control}
                        name="brand_positioning"
                        label="Brand Positioning*"
                        placeholder="Description of how the brand is positioned in the market, including its unique value proposition, target audience, and competitive landscape."
                    />
                </FormCardContent>


                <FormCardContent title="Project Images">
                    {keptFiles && (Array.isArray(keptFiles) ? keptFiles : [keptFiles]).map((url) => (
                        <div className="flex flex-wrap gap-2 mb-2">

                            <div key={url} className="relative group">
                                <img
                                    src={url}
                                    alt="existing"
                                    className="w-16 h-16 object-cover rounded-md border"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveExisting(url)}
                                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    ))}

                    <FormFieldFile
                        control={form.control}
                        name="file"
                        label="Images"
                        placeholder="Upload profile images"
                        files={files}
                        setFiles={setFiles}
                    />
                </FormCardContent>

                <div className="pb-6">
                    <Button
                        className="w-full flex items-center justify-center rounded-xl p-6"
                        type="submit"
                        form="update-project-form"
                    >
                        <Save className="mr-2 h-4 w-4" />
                        Update Project
                    </Button>
                </div>
            </form>
        </Form>
    )

}

export default UpdateProjectForm;