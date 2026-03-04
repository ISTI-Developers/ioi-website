import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormFieldText from "../fields/FormFieldText";
import FormFieldTextArea from "../fields/FormFieldTextArea";
import FormFieldFile from "../fields/FormFieldFile";
import FormCardContent from "@/components/layout/FormCardContent";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAddClient, useUpdateClient, type Client } from "@/hooks/useClients";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "@/firebase";

interface ClientFormProps {
    onSuccess?: () => void;
    existing?: Client;
}

function ClientForm({ onSuccess, existing }: ClientFormProps) {
    const isEdit = !!existing;

    const form = useForm({
        defaultValues: {
            client_name: existing?.client_name ?? "",
            client_description: existing?.client_description ?? "",
        },
        mode: "all",
    });

    const [files, setFiles] = useState<File[]>([]);
    const { mutate: addClient, isPending: isAdding } = useAddClient();
    const { mutate: updateClient, isPending: isUpdating } = useUpdateClient();
    const isPending = isAdding || isUpdating;

    const onSubmit = async (values: any) => {
        try {
            let fileURL = existing?.file ?? "";

            if (files.length > 0) {
                const storage = getStorage(app);
                const file = files[0];
                const imageRef = ref(storage, `clients/${Date.now()}_${file.name}`);
                await uploadBytes(imageRef, file);
                fileURL = await getDownloadURL(imageRef);
                console.log("Firebase Download URL:", fileURL);
            } else if (!isEdit) {
                alert("Please upload an image");
                return;
            }

            const payload = { ...values, file: fileURL };

            if (isEdit) {
                updateClient(
                    { id: existing!.client_id!, data: payload },
                    {
                        onSuccess: () => {
                            form.reset();
                            setFiles([]);
                            onSuccess?.();
                        },
                    }
                );
            } else {
                addClient(payload, {
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
                id="client-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
            >
                <FormCardContent title="Client Information">
                    <FormFieldText
                        control={form.control}
                        name="client_name"
                        label="Client Name *"
                        placeholder="e.g. CLN"
                    />
                    <FormFieldTextArea
                        control={form.control}
                        name="client_description"
                        label="Description *"
                        placeholder="Add asset's condition, accessories, or special handling..."
                    />
                </FormCardContent>

                <FormCardContent title="Brand Image">
                    <FormFieldFile
                        control={form.control}
                        name="file"
                        label="Image"
                        placeholder="Upload client image"
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
                        {isPending ? "SAVING..." : isEdit ? "UPDATE CLIENT" : "ADD CLIENT"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default ClientForm;