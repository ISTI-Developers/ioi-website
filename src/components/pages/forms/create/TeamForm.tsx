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
import { useAddTeam, useUpdateTeam, useRoles } from "@/hooks/useTeam";
import { SelectItem } from "@/components/ui/select";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "@/firebase";
import type { Team } from "@/hooks/useTeam";
import { toast } from "sonner";

interface TeamFormProps {
    onSuccess?: () => void;
    existing?: Team;
}

function TeamForm({ onSuccess, existing }: TeamFormProps) {
    const isEdit = !!existing;

    const form = useForm({
        defaultValues: {
            employee_id: existing?.employee_id ?? 0,
            first_name: existing?.first_name ?? "",
            last_name: existing?.last_name ?? "",
            position: existing?.position ?? "",
            is_mancomm: existing?.is_mancomm ?? 0,
            quote: existing?.quote ?? "",
            role_id: existing?.role_id ?? undefined,
        },
        mode: "all",
    });

    const [files, setFiles] = useState<File[]>([]);
    const { mutate: addTeam, isPending: isAdding } = useAddTeam();
    const { mutate: updateTeam, isPending: isUpdating } = useUpdateTeam();
    const { data: roles } = useRoles();
    const isPending = isAdding || isUpdating;

    const onSubmit = async (values: any) => {
        try {
            let fileURL = existing?.file ?? "";

            if (files.length > 0) {
                const storage = getStorage(app);
                const file = files[0];
                const imageRef = ref(storage, `team/${Date.now()}_${file.name}`);
                await uploadBytes(imageRef, file);
                fileURL = await getDownloadURL(imageRef);
                console.log("Firebase Download URL:", fileURL);
            } else if (!isEdit) {
                alert("Please upload a profile image");
                return;
            }

            const payload = { ...values, file: fileURL };

            if (isEdit) {
                updateTeam(
                    { id: existing!.team_id!, data: payload },
                    {
                        onSuccess: () => {
                            toast.success("Team member updated successfully");
                            form.reset();
                            setFiles([]);
                            onSuccess?.();
                        },
                        onError: () => {
                            toast.error("Failed to update team member");
                        },
                    }
                );
            } else {
                addTeam(payload, {
                    onSuccess: () => {
                        toast.success("Team member added successfully");
                        form.reset();
                        setFiles([]);
                        onSuccess?.();
                    },
                    onError: () => {
                        toast.error("Failed to add team member");
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
                id="team-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
            >
                <FormCardContent title="Team Information">
                    <FormFieldText
                        control={form.control}
                        name="employee_id"
                        label="Employee ID *"
                        placeholder="e.g. 12345678"
                    />
                    <div className="gap-4 sm:flex sm:gap-x-5">
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
                        placeholder="e.g. Developer"
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
                        placeholder="Add a quote..."
                    />
                </FormCardContent>

                <FormCardContent title="Profile Image">
                    <FormFieldFile
                        control={form.control}
                        name="file"
                        label="Image"
                        placeholder="Upload profile image"
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
                        {isPending ? "SAVING..." : isEdit ? "UPDATE TEAM" : "ADD TEAM"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default TeamForm;