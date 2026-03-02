import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormFieldText from "../fields/FormFieldText";
import FormFieldTextArea from "../fields/FormFieldTextArea";
import FormCardContent from "@/components/layout/FormCardContent";
import FormFieldSelect from "../fields/FormFieldSelect";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SelectItem } from "@/components/ui/select";
import { useAddCareer } from "@/hooks/useCareer";

interface CareerFormProps {
    onSuccess?: () => void;
}

function CareerForm({ onSuccess }: CareerFormProps) {
    const form = useForm({
        defaultValues: {
            career_title: "",
            department: "",
            work_setup: "",
            employment_type: "",
            description: "",
            application_link: "",
            file: undefined,
        },
        mode: "all",
    });

    const [files, setFiles] = useState<File[]>([]);
    const { mutate, isPending } = useAddCareer();

    const onSubmit = (values: any) => {
        console.log("form values:", values);
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
                    console.error("Failed to save career", err);
                },
            }
        );
    };

    return (
        <Form {...form}>
            <form
                id="career-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
                encType="multipart/form-data"
            >
                <FormCardContent title="Career Information">
                    <FormFieldText
                        control={form.control}
                        name="career_title"
                        label="Career Title *"
                        placeholder="e.g. Software Engineer"
                    />

                    <div className="gap-4 sm:flex sm:gap-x-5">
                        <FormFieldSelect
                            control={form.control}
                            name="department"
                            label="Department *"
                            placeholder="Select Department"
                            className="w-full sm:w-1/2"
                            >
                            <SelectItem value="Business Development">Business Development</SelectItem>
                            <SelectItem value="Accounts Management">Accounts Management</SelectItem>
                            <SelectItem value="Creative Team>">Creative Team</SelectItem>
                        </FormFieldSelect>
                        

                        <FormFieldSelect
                            control={form.control}
                            name="work_setup"
                            label="Work Setup *"
                            placeholder="Select work setup"
                            className="w-full sm:w-1/2"
                            >
                            <SelectItem value="Onsite">Onsite</SelectItem>
                            <SelectItem value="Online">Online</SelectItem>
                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                        </FormFieldSelect>
                        
                    </div>
                </FormCardContent>

                <FormCardContent title="Job Details">
                    <FormFieldSelect
                        control={form.control}
                        name="employment_type"
                        label="Employment Type *"
                        placeholder="Select employment type"
                    >
                        <SelectItem value="Full-Time">Full-Time</SelectItem>
                        <SelectItem value="Part-Time">Part-Time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                    </FormFieldSelect>

                    <FormFieldSelect
                        control={form.control}
                        name="is_active"
                        label="Status"
                        placeholder="Select status"
                    >
                        <SelectItem value="1">Active</SelectItem>
                        <SelectItem value="0">Inactive</SelectItem>
                    </FormFieldSelect>

                    <FormFieldText
                        control={form.control}
                        name="application_link"
                        label="Application Link"
                        placeholder="e.g. https://apply.example.com/job"
                    />

                    <FormFieldTextArea
                        control={form.control}
                        name="description"
                        label="Job Description *"
                        placeholder="Describe the role, responsibilities, and requirements..."
                    />
                </FormCardContent>

                <div className="pb-6">
                    <Button
                        className="w-full flex items-center justify-center rounded-xl p-6"
                        type="submit"
                        form="career-form"
                        disabled={isPending}
                    >
                        {isPending ? "SAVING..." : "ADD CAREER"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default CareerForm;