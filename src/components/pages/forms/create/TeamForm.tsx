import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormFieldText from "../fields/FormFieldText";
import FormFieldTextArea from "../fields/FormFieldTextArea";
import FormFieldRoleCombobox from "../fields/FormFieldRoleCombobox";
import FormFieldFile from "../fields/FormFieldFile";
import FormCardContent from "@/components/layout/FormCardContent";
import FormFieldSelect from "../fields/FormFieldSelect";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAddTeam } from "@/hooks/useTeam";
import { useRoles } from "@/hooks/useTeam";
import { SelectItem } from "@/components/ui/select";

interface TeamFormProps {
    onSuccess?: () => void;
}

function TeamForm({ onSuccess }: TeamFormProps) {
    const form = useForm({
        defaultValues: {
            employee_id: "",
            first_name: "",
            last_name: "",
            position: "",
            is_mancomm: 0,
            quote: "",
            role_id: undefined,
            file: undefined,
        },
        mode: "all",
    });

    const [files, setFiles] = useState<File[]>([]);



    const { mutate } = useAddTeam();
    const { data: roles } = useRoles();

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
                    console.error("Failed to save team", err);
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
                        name="employee_id"
                        label="Employee ID *"
                        placeholder="e.g. 12345678"
                    />
                    <div className=" gap-4 sm:flex sm:gap-x-5">
                        <FormFieldText
                            control={form.control}
                            name="first_name"
                            label="First Name *"
                            placeholder="e.g. Juan"
                            className="w-full sm:w-1/2"
                        />

                        <FormFieldText
                            control={form.control}
                            name="last_name"
                            label="Last Name *"
                            placeholder="e.g. dela Cruz"
                            className="w-full sm:w-1/2"
                        />
                    </div>

                </FormCardContent>

                <FormCardContent title="Team Role & Details">
                    <FormFieldText
                        control={form.control}
                        name="position"
                        label="Position *"
                        placeholder="e.g. Juan"
                    />

                    <FormFieldRoleCombobox
                        control={form.control}
                        name="role_id"
                        label="Role *"
                        roles={roles || []}
                    />


                    <FormFieldSelect
                        control={form.control}
                        name="is_mancomm"
                        label="Manager Committee"
                        placeholder="Select option"
                    >
                        <SelectItem value="1">Yes</SelectItem>
                        <SelectItem value="0">No</SelectItem>
                    </FormFieldSelect>




                    <FormFieldTextArea
                        control={form.control}
                        name="quote"
                        label="Quotes *"
                        placeholder="Add asset's condition, accessories, or special handling..."


                    />

                </FormCardContent>

                <FormCardContent title="Profile Image">

                    <FormFieldFile
                        control={form.control}
                        name="file"
                        label="Images"
                        placeholder="Upload images"
                        files={files}
                        setFiles={setFiles}
                    />


                    {/* <FormFieldTextArea
                        control={form.control}
                        name="notes"
                        label="Notes *"
                        placeholder="Add asset's condition, accessories, or special handling..."
                    /> */}
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

export default TeamForm;
