import { PointSchema } from "@/data/schemas";
import type { Point } from "@/data/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import FormFieldTextArea from "../fields/FormFieldTextArea";
import { useUpdatePoint } from "@/hooks/useProjectPoint";
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



interface UpdatePointFormProps {
    point: Point;
    open: boolean;
    setOpen: (open: boolean) => void;

}


function UpdatePointForm({ point, open, setOpen }: UpdatePointFormProps) {
    const form = useForm<Point>({
        resolver: zodResolver(PointSchema),
        defaultValues: { ...point },
        mode: "all",
    });

    const { mutate } = useUpdatePoint();

    function onSubmit(values: Point) {
        const changed = compareObjects(point, values);

        if (Object.values(changed).length === 0) {
            toast.info("No changes detected");
            return;
        }

        mutate(
            {
                id: values.point_id as number,
                data: changed,
            },
            {
                onSuccess: () => {
                    toast.success("Updated Point");
                    setOpen(false);
                    form.reset(values);
                },
            }
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent>

                <DialogHeader>
                    <DialogTitle>Update Point Detail</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form key={point.point_id}
                        onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <FormFieldTextArea
                            control={form.control}
                            name="content"
                            label="Content"
                        />

                        {/* <FormFieldTextArea
                            control={form.control}
                            name="type"
                            label="Type"
                        /> */}

                        <div className="flex justify-end gap-2 pt-4">
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
    );
}

export default UpdatePointForm;