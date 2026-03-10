import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormFieldText from "../fields/FormFieldText";
import FormFieldTextArea from "../fields/FormFieldTextArea";
import FormCardContent from "@/components/layout/FormCardContent";
import FormFieldSelect from "../fields/FormFieldSelect";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { useAddCareer, useUpdateCareer } from "@/hooks/useCareer"; 
import { toast } from "sonner"; 
import type { Career } from "@/hooks/useCareer"; 

interface CareerFormProps {
    onSuccess?: () => void;
    existing?: Career; 
}

function CareerForm({ onSuccess, existing }: CareerFormProps) {
    const isEdit = !!existing;

    const form = useForm({
        defaultValues: {
            career_title: existing?.career_title ?? "", 
            department: existing?.department ?? "",     
            work_setup: existing?.work_setup ?? "",    
            employment_type: existing?.employment_type ?? "", 
            description: existing?.description ?? "",  
            application_link: existing?.application_link ?? "", 
            is_active: existing?.is_active ?? 1,      
        },
        mode: "all",
    });

   
    const { mutate: addCareer, isPending: isAdding } = useAddCareer();
    const { mutate: updateCareer, isPending: isUpdating } = useUpdateCareer(); 
    const isPending = isAdding || isUpdating;

    const onSubmit = (values: any) => {

        if (isEdit) {
            updateCareer(
                { id: existing!.career_id!, data: values },
                {
                    onSuccess: () => {
                        toast.success("Career updated successfully"); // ← ADDED toast
                        form.reset();
                        onSuccess?.();
                    },
                    onError: () => {
                        toast.error("Failed to update career"); 
                    },
                }
            );
        } else {
          
            addCareer(values, {
                onSuccess: () => {
                    toast.success("Career added successfully");
                    form.reset();
                    onSuccess?.();
                },
                onError: () => {
                    toast.error("Failed to add career"); 
                },
            });
        }
    };

    return (
        <Form {...form}>
            <form
                id="career-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
                
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
                            <SelectItem value="Creative Team">Creative Team</SelectItem> 
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
                        disabled={isPending}
                    >
                        
                        {isPending ? "SAVING..." : isEdit ? "UPDATE CAREER" : "ADD CAREER"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default CareerForm;