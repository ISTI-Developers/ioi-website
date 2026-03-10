import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormCardContent from "@/components/layout/FormCardContent";
import FormFieldTextArea from "../../forms/fields/FormFieldTextArea";
import { useProjectByProse } from "@/hooks/useProjects"


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

    const { data: project, isLoading } = useProjectByProse(projectId);
    console.log(project);
    const prose = project?.prose || [];

    if (isLoading) return <p>Loading prose...</p>;


    return (
        <Form {...form}>
            <div className="space-y-10 gap-5">
                <div className="flex gap-2">
                    <FormCardContent title="Prose">
                        <ul className="list-disc list-inside">
                            {prose.map((p) => (
                                <li key={p.prose_id}>{p.content}</li>
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
                            // onClick={() => onSubmit("problem")}

                            >
                                Add
                            </Button>
                        </div>
                    </FormCardContent>

                </div>

            </div>
        </Form>
    )
}