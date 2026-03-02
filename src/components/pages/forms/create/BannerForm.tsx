import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormFieldText from "../fields/FormFieldText";
import FormFieldFile from "../fields/FormFieldFile";
import FormCardContent from "@/components/layout/FormCardContent";
import FormFieldSelect from "../fields/FormFieldSelect";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SelectItem } from "@/components/ui/select";
import { useAddBanner } from "@/hooks/useBanner";

interface BannerFormProps {
    onSuccess?: () => void;
}

function BannerForm({ onSuccess }: BannerFormProps) {
    const form = useForm({
        defaultValues: {
            section: "",
            year: "",
            text: "",
            file: undefined,
        },
        mode: "all",
    });

    const [files, setFiles] = useState<File[]>([]);
    const { mutate, isPending } = useAddBanner();

    const onSubmit = (values: any) => {
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
                    console.error("Failed to save banner", err);
                },
            }
        );
    };

    return (
        <Form {...form}>
            <form
                id="banner-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
                encType="multipart/form-data"
            >
                <FormCardContent title="Banner Information">
                    <FormFieldSelect
                        control={form.control}
                        name="section"
                        label="Section *"
                        placeholder="Select section"
                    >
                        <SelectItem value="about_top">About Banner</SelectItem>
                        <SelectItem value="career_bottom">Career Bottom</SelectItem>
                        <SelectItem value="contact_middle">Contact Middle</SelectItem>
                        <SelectItem value="contact_bottom">Contact Bottom</SelectItem>
                        <SelectItem value="home_bottom">Home Bottom</SelectItem>
                        <SelectItem value="project_top">Project Top</SelectItem>
                    </FormFieldSelect>

                    <div className="gap-4 sm:flex sm:gap-x-5">
                        <FormFieldText
                            control={form.control}
                            name="year"
                            label="Year *"
                            placeholder="e.g. 2024"
                            className="w-full sm:w-1/2"
                        />
                        <FormFieldText
                            control={form.control}
                            name="text"
                            label="Text *"
                            placeholder="e.g. innovationone.com.ph"
                            className="w-full sm:w-1/2"
                        />
                    </div>
                </FormCardContent>

                <FormCardContent title="Banner Image">
                    <FormFieldFile
                        control={form.control}
                        name="file"
                        label="Image"
                        placeholder="Upload banner image"
                        files={files}
                        setFiles={setFiles}
                    />
                </FormCardContent>

                <div className="pb-6">
                    <Button
                        className="w-full flex items-center justify-center rounded-xl p-6"
                        type="submit"
                        form="banner-form"
                        disabled={isPending}
                    >
                        {isPending ? "SAVING..." : "ADD BANNER"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default BannerForm;