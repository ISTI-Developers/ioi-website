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
import { X } from "lucide-react";

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

    // 👈 tracks which existing images the user wants to keep
    const [keptFiles, setKeptFiles] = useState<string[]>(existing?.file ?? []);

    const { mutate: addTeam, isPending: isAdding } = useAddTeam();
    const { mutate: updateTeam, isPending: isUpdating } = useUpdateTeam();
    const { data: roles } = useRoles();
    const isPending = isAdding || isUpdating;

    const handleRemoveExisting = (urlToRemove: string) => {
        setKeptFiles((prev) => prev.filter((url) => url !== urlToRemove));
    };

    const onSubmit = async (values: any) => {
        try {
            let fileURLs: string[] = keptFiles;

            if (files.length > 0) {
                const storage = getStorage(app);

                const uploadedURLs = await Promise.all(
                    files.map(async (file) => {
                        const imageRef = ref(storage, `team/${Date.now()}_${file.name}`);
                        await uploadBytes(imageRef, file);
                        return await getDownloadURL(imageRef);
                    })
                );

                
                fileURLs = [...fileURLs, ...uploadedURLs];
            } else if (!isEdit && fileURLs.length === 0) {
                alert("Please upload at least one profile image");
                return;
            }

            const payload = { ...values, file: fileURLs };

            if (isEdit) {
                updateTeam(
                    {
                        id: existing!.team_id!,
                        data: payload,
                        oldFiles: existing?.file ?? [], 
                    },
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
            toast.error("Image upload failed");
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

                <FormCardContent title="Profile Images">
                    {isEdit && keptFiles.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                            {keptFiles.map((url) => (
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
                            ))}
                        </div>
                    )}

                    <FormFieldFile
                        control={form.control}
                        name="file"
                        label="Images"
                        placeholder="Upload profile images"
                        files={files}
                        setFiles={setFiles}
                        multiple
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