
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormCardContent from "@/components/layout/FormCardContent";
import FormFieldTextArea from "../../forms/fields/FormFieldTextArea";
import FormFieldText from "../../forms/fields/FormFieldText";

export default function Bullet() {

    const form = useForm({
        defaultValues: {
            project_name: "",
            project_type: "",
            project_category: "",
            start_date: "",
            end_date: undefined,
            company_description: "",
            brand_positioning: "",
            file: undefined,
        },
        mode: "all",
    });


    return (
        <Form {...form}>

            <div className="space-y-10 gap-5">
                <div className="flex gap-2">
                    <FormCardContent title="Problems">
                        <p>Bullet Point 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <p>Bullet Point 2: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <p>Bullet Point 3: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                        <FormFieldTextArea
                            control={form.control}
                            name="description"
                            label=""
                            placeholder="Describe the role, responsibilities, and requirements..."

                        />


                        <div className="flex justify-end">
                            <button
                                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 justify-end"
                            >
                                Add
                            </button>
                        </div>

                    </FormCardContent>
                    <FormCardContent title="Solutions">
                        <p>Bullet Point 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <p>Bullet Point 2: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <p>Bullet Point 3: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                        <FormFieldTextArea
                            control={form.control}
                            name="description"
                            label=""
                            placeholder="Describe the role, responsibilities, and requirements..."

                        />


                        <div className="flex justify-end">
                            <button
                                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 justify-end"
                            >
                                Add
                            </button>
                        </div>
                    </FormCardContent>
                </div>
                <div className="flex gap-2">
                    <FormCardContent title="Service Rendered">
                        <p>Bullet Point 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <p>Bullet Point 2: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <p>Bullet Point 3: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                        <FormFieldTextArea
                            control={form.control}
                            name="description"
                            label=""
                            placeholder="Describe the role, responsibilities, and requirements..."

                        />


                        <div className="flex justify-end">
                            <button
                                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 justify-end"
                            >
                                Add
                            </button>
                        </div>

                    </FormCardContent>
                    <FormCardContent title="Key Results">
                        <p>Bullet Point 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <p>Bullet Point 2: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <p>Bullet Point 3: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                        <FormFieldTextArea
                            control={form.control}
                            name="description"
                            label=""
                            placeholder="Describe the role, responsibilities, and requirements..."

                        />


                        <div className="flex justify-end">
                            <button
                                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 justify-end"
                            >
                                Add
                            </button>
                        </div>

                    </FormCardContent>
                </div>
            </div>
        </Form>
    );


}