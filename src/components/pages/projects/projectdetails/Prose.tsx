import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormCardContent from "@/components/layout/FormCardContent";
import FormFieldTextArea from "../../forms/fields/FormFieldTextArea";
import { useProjectByIdWithPointsAndProse } from "@/hooks/useProjects"
import { useAddProse } from "@/hooks/useProjectProse";
import { EllipsisMenu } from "@/components/ui/ellipsis-menu";
import UpdateProseForm from "../../forms/update/UpdateProseForm";
import type { Prose } from "@/data/types";

interface ProseProps {
    projectId: number;
    onSuccess?: () => void;
}

export default function Prose({ projectId, onSuccess }: ProseProps) {

    const [editingProse, setEditingProse] = useState<Prose | null>(null);
    const [openUpdate, setOpenUpdate] = useState(false);

    const form = useForm({
        defaultValues: {
            content: ""
        },
        mode: "all",
    });

    const { mutate } = useAddProse();
    const { data: project, isLoading } = useProjectByIdWithPointsAndProse(projectId);
    const prose = project?.prose || [];

    if (isLoading) return <p>Loading prose...</p>;


    const onSubmit = (values: any) => {
        if (!values.content?.trim()) return;

        mutate(
            {
                content: values.content,
                project_id: projectId,
            },
            {
                onSuccess: () => {
                    form.reset();
                    onSuccess?.();
                },
            }
        );
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

                <div className="space-y-10 gap-5">
                    <div className="flex gap-2">
                        <FormCardContent title="Prose">
                            <div>
                                <ul className="space-y-1 list-disc list-inside">
                                    {prose.map((p) => (
                                        <li
                                            key={p.prose_id}
                                            className="group relative pr-8"
                                        >
                                            {p.content}

                                            <span className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100">
                                                <EllipsisMenu
                                                    hoverable
                                                    items={[
                                                        {
                                                            label: "Edit",
                                                            onClick: () => {
                                                                setEditingProse(p);
                                                                setOpenUpdate(true);
                                                            },
                                                        },
                                                    ]}
                                                />
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {openUpdate && editingProse && (
                                    <UpdateProseForm
                                        prose={editingProse}
                                        open={openUpdate}
                                        setOpen={setOpenUpdate}
                                    />
                                )}

                            </div>
                            <FormFieldTextArea
                                control={form.control}
                                name="content"
                                label="Description"
                                placeholder="Add a problem..."
                            />
                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    size="sm"
                                    className="mt-2"
                                >
                                    Add
                                </Button>
                            </div>
                        </FormCardContent>

                    </div>
                </div>
            </form>
        </Form>
    )
}