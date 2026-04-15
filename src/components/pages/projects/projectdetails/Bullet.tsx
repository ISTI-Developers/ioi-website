import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormCardContent from "@/components/layout/FormCardContent";
import FormFieldTextArea from "../../forms/fields/FormFieldTextArea";
import { useProjectByIdWithPointsAndProse } from "@/hooks/useProjects"
import { EllipsisMenu } from "@/components/ui/ellipsis-menu";
import { useAddPoint } from "@/hooks/useProjectPoint";
import UpdatePointForm from "../../forms/update/UpdatePointForm";
import type { Point } from "@/data/types";



interface BulletProps {
    projectId: number;
    onSuccess?: () => void;
}

export default function Bullet({ projectId, onSuccess }: BulletProps) {
    const [editingPoint, setEditingPoint] = useState<Point | null>(null);
    const [openUpdate, setOpenUpdate] = useState(false);
    const form = useForm({
        defaultValues: {
            problem: "",
            solution: "",
            service: "",
            result: "",
        },
        mode: "all",
    });

    const { mutate } = useAddPoint();

    const { data: project, isLoading } = useProjectByIdWithPointsAndProse(projectId);

    if (isLoading) return <p>Loading bullets...</p>;

    const points = project?.points || [];

    const problems = points.filter((p) => p.type === "problem");
    const solutions = points.filter((p) => p.type === "solution");
    const services = points.filter((p) => p.type === "service");
    const results = points.filter((p) => p.type === "result");



    const onSubmit = (type: "problem" | "solution" | "service" | "result") => {
        const value = form.getValues(type);
        console.log("submitting:", { project_id: projectId, type, content: value });

        if (!value?.trim()) return;

        console.log(value);
        mutate(
            {
                project_id: projectId,
                content: value,
                type,
            },
            {
                onSuccess: () => {
                    form.setValue(type, "");
                    onSuccess?.();
                },
                onError: (err) => {
                    console.error("Failed to add point", err);
                }
            }
        )
    }





    return (
        <Form {...form}>
            <div className="space-y-10 gap-5">
                <div className="flex gap-2">
                    <FormCardContent title="Problems">
                        <div>
                            <ul className="space-y-1 list-disc list-inside">
                                {problems.map((p) => (
                                    <li
                                        key={p.point_id}
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
                                                            setEditingPoint(p);
                                                            setOpenUpdate(true);
                                                        },
                                                    },
                                                ]}
                                            />
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {openUpdate && editingPoint && (
                                <UpdatePointForm
                                    point={editingPoint}
                                    open={openUpdate}
                                    setOpen={setOpenUpdate}
                                />
                            )}

                        </div>
                        <FormFieldTextArea
                            control={form.control}
                            name="problem"
                            label="description"
                            placeholder="Add a problem..."
                        />
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                size="sm"
                                className="mt-2"
                                onClick={() => onSubmit("problem")}

                            >
                                Add
                            </Button>
                        </div>
                    </FormCardContent>

                    <FormCardContent title="Solutions">
                        <ul className="list-disc list-inside">
                            {solutions.map((p) => (
                                <li key={p.point_id}>{p.content}</li>
                            ))}
                        </ul>
                        <FormFieldTextArea
                            control={form.control}
                            name="solution"
                            label=""
                            placeholder="Add a solution..."
                        />
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                size="sm"
                                className="mt-2"
                                onClick={() => onSubmit("solution")}

                            >
                                Add
                            </Button>
                        </div>
                    </FormCardContent>
                </div>

                <div className="flex gap-2">
                    <FormCardContent title="Service Rendered">
                        <ol className=" list-decimal list-inside">
                            {services.map((p) => (
                                <li key={p.point_id}>{p.content}</li>
                            ))}
                        </ol>
                        <FormFieldTextArea
                            control={form.control}
                            name="service"
                            label=""
                            placeholder="Add a service..."
                        />
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                size="sm"
                                className="mt-2"
                                onClick={() => onSubmit("service")}

                            >
                                Add
                            </Button>                        </div>
                    </FormCardContent>

                    <FormCardContent title="Key Results">
                        <ul className="list-decimal list-inside">
                            {results.map((p) => (
                                <li key={p.point_id}>{p.content}</li>
                            ))}
                        </ul>
                        <FormFieldTextArea
                            control={form.control}
                            name="result"
                            label=""
                            placeholder="Add a result..."
                        />
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                size="sm"
                                className="mt-2"
                                onClick={() => onSubmit("result")}

                            >
                                Add
                            </Button>
                        </div>
                    </FormCardContent>
                </div>
            </div>
        </Form>
    );
}