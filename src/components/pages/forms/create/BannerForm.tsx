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

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app, storage } from "@/firebase";
console.log("Firebase App:", app);
console.log("Firebase Storage:", storage);
interface BannerFormProps {
    onSuccess?: () => void;
}

function BannerForm({ onSuccess }: BannerFormProps) {
    const form = useForm({
        defaultValues: {
            section: "",
            year: "",
            text: "",
        },
        mode: "all",
    });

    const [files, setFiles] = useState<File[]>([]);
    const { mutate, isPending } = useAddBanner();

    const onSubmit = async (values: any) => {
        try {
            if (!files.length) {
                alert("Please upload an image");
                return;
            }

            const storage = getStorage(app);
            const file = files[0];
            const imageRef = ref(storage, `banners/${Date.now()}_${file.name}`);

            await uploadBytes(imageRef, file);
            const downloadURL = await getDownloadURL(imageRef);
            console.log("Firebase Download URL:", downloadURL);

            mutate(
                {
                    ...values,
                    file: downloadURL,
                },
                {
                    onSuccess: () => {
                        form.reset();
                        setFiles([]);
                        onSuccess?.();
                    },
                }
            );
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
                        {isPending ? "SAVING..." : "ADD BANNER"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default BannerForm;