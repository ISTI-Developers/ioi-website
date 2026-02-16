import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormFieldText from "../fields/FormFieldText";
import FormFieldTextArea from "../fields/FormFieldTextArea";
import FormFieldFile from "../fields/FormFieldFile";
import FormCardContent from "@/components/layout/FormCardContent";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAddClient } from "@/hooks/useClients";


interface ClientFormProps {
    onSuccess?: () => void;
}


function ClientForm({ onSuccess }: ClientFormProps) {
    const form = useForm({
        defaultValues: {
            client_name: "",
            client_description: "",
            file: undefined,

        },
        mode: "all",
    });

    const [files, setFiles] = useState<File[]>([]);

    const { mutate } = useAddClient();

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
                    console.error("Failed to save client", err);
                },
            }
        );
    };

    return (
   <Form {...form}>
            <form
                id="team-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
                encType="multipart/form-data"
            >
                <FormCardContent title="Team Information">
                    <FormFieldText
                        control={form.control}
                        name="client_name"
                        label="Client  Name *"
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
                        form="team-form"
                    >
                        ADD TEAM
                    </Button>
                </div>
            </form>
        </Form>
    );
}


export default ClientForm;