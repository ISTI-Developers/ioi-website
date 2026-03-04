import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormFieldText from "../fields/FormFieldText";
import FormFieldFile from "../fields/FormFieldFile";
import FormCardContent from "@/components/layout/FormCardContent";
import FormFieldSelect from "../fields/FormFieldSelect";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SelectItem } from "@/components/ui/select";
import { useAddBanner, useUpdateBanner, type Banner } from "@/hooks/useBanner";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "@/firebase";

interface BannerFormProps {
    onSuccess?: () => void;
    existing?: Banner;
}

function BannerForm({ onSuccess, existing }: BannerFormProps) {
    const isEdit = !!existing;

    const form = useForm({
        defaultValues: {
            section: existing?.section ?? "",
            year: existing?.year ?? "",
            text: existing?.text ?? "",
        },
        mode: "all",
    });

    const [files, setFiles] = useState<File[]>([]);
    const { mutate: addBanner, isPending: isAdding } = useAddBanner();
    const { mutate: updateBanner, isPending: isUpdating } = useUpdateBanner();
    const isPending = isAdding || isUpdating;

    const onSubmit = async (values: any) => {
        try {
            let fileURL = existing?.file ?? "";

            if (files.length > 0) {
                const storage = getStorage(app);
                const file = files[0];
                const imageRef = ref(storage, `banners/${Date.now()}_${file.name}`);
                await uploadBytes(imageRef, file);
                fileURL = await getDownloadURL(imageRef);
                console.log("Firebase Download URL:", fileURL);
            } else if (!isEdit) {
                alert("Please upload an image");
                return;
            }

            const payload = { ...values, file: fileURL };

            if (isEdit) {
                updateBanner(
                    { id: existing!.banner_id!, data: payload },
                    {
                        onSuccess: () => {
                            form.reset();
                            setFiles([]);
                            onSuccess?.();
                        },
                    }
                );
            } else {
                addBanner(payload, {
                    onSuccess: () => {
                        form.reset();
                        setFiles([]);
                        onSuccess?.();
                    },
                });
            }
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    return (
        <Form {...form}>
            <form
                id="banner-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
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
                        disabled={isPending}
                    >
                        {isPending ? "SAVING..." : isEdit ? "UPDATE BANNER" : "ADD BANNER"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default BannerForm;