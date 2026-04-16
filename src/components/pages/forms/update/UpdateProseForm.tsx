import { ProseSchema } from "@/data/schemas";
import type { Prose } from "@/data/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import FormFieldTextArea from "../fields/FormFieldTextArea";
import { useUpdateProse } from "@/hooks//useProjectProse";
import { compareObjects } from "@/lib/utils";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";



interface UpdateProseFormProps {
    prose: Prose;
    open: boolean;
    setOpen: (open: boolean) => void;
}


function UpdateProseForm({ prose, open, setOpen }: UpdateProseFormProps) {
    const form = useForm<Prose>({
        resolver: zodResolver(ProseSchema),
        defaultValues: {
            ...prose
        },
        mode: "all",
    });

    const { mutate } = useUpdateProse();

    function onSubmit(values: Prose) {
        const changed = compareObjects(prose, values);

        if (Object.values(changed).length === 0) {
            toast.info("No changes detected");
            return;
        }

        mutate(
            {
                id: values.prose_id as number,
                data: {
                    ...changed,
                      project_id: prose.project_id 
                },
            },
            {
                onSuccess: () => {
                    toast.success("Updated Prose");
                    setOpen(false);
                    form.reset(values);
                },
            }

        );
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-[95vw] max-w-2xl max-h-[85vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Update Prose Detail</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form key={prose.prose_id}
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col flex-1 overflow-hidden"
                    >

                        <div className="flex-1 overflow-y-auto space-y-4">
                            <FormFieldTextArea
                                control={form.control}
                                name="content"
                                label="Content"
                            />
                        </div>
                        <div className="flex justify-end gap-2 pt-4 border-t bg-white sticky bottom-0">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>

                            <Button type="submit">
                                <Save className="mr-2 h-4 w-4" />
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProseForm;