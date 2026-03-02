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


interface ProjectFormProps {
    onSuccess?: () => void;
}

function ProjectForm({ onSuccess }: ProjectFormProps) {

    const form = useForm({
        defaultValues: {
            project_name: "",
            project_type: "",
            project_category: "",
            start_date: "",
            end_date: undefined,
            company_description: "",
            brand_positioning: "",
            file: undefined,
        },
        mode: "all",
    });


    const [files, setFiles] = useState<File[]>([]);


    const { mutate } = useAddProject();

    const onSubmit = (values: any) => {
        console.log(values);
        const { file, ...rest } = values;

        mutate(
            {
                data: rest,
                file: files,
            },

            {
                onSuccess: () => {
                    form.reset();
                    setFiles([]);
                    onSuccess?.();

                },
                onError: (err) => {
                    console.error("Failed to save project", err);
                },
            }

        );
    };

    return (
        <Form {...form}>
            <form
                id="project-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
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

                <FormCardContent title="Project Image">

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
                        form="project-form"
                    >
                        ADD PROJECT
                    </Button>
                </div>


            </form>

        </Form>
    );
}

export default ProjectForm;