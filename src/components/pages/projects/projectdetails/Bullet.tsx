import FormCardContent from "@/components/layout/FormCardContent";
import FormFieldText from "../../forms/fields/FormFieldText";

export default function Bullet() {
    return (
        <div className="space-y-10 gap-5">
            <div className="flex gap-2">
                <FormCardContent title="Problems">
                    <p>Bullet Point 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p>Bullet Point 2: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <p>Bullet Point 3: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                    <textarea
                        name="project_name"
                        placeholder="e.g. Project IOI"
                        className="input-style border p-2 w-full"
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
               
               <textarea
                        name="project_name"
                        placeholder="e.g. Project IOI"
                        className="input-style border p-2 w-full"
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
                
                <textarea
                        name="project_name"
                        placeholder="e.g. Project IOI"
                        className="input-style border p-2 w-full"
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
                
                <textarea
                        name="project_name"
                        placeholder="e.g. Project IOI"
                        className="input-style border p-2 w-full"
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
    );


}