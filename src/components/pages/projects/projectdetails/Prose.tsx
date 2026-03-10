import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormCardContent from "@/components/layout/FormCardContent";
import FormFieldTextArea from "../../forms/fields/FormFieldTextArea";
import { useProjectByIdWithPointsAndProse } from "@/hooks/useProjects"
import { useAddProse } from "@/hooks/useProjectProse";


interface ProseProps {
    projectId: number;
    onSuccess?: () => void;
}

export default function Prose({ projectId, onSuccess }: ProseProps) {


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
                            <ul className="list-disc list-inside">
                                {prose.map((p) => (
                                    <li key={p.prose_id}>
                                        {p.content.split(/\n+/).map((line, index) => (
                                            <p key={index} className="mb-2">
                                                {line}
                                            </p>
                                        ))}
                                    </li>
                                ))}
                            </ul>
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