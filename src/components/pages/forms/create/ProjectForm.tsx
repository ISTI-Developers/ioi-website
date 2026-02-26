import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormFieldText from "../fields/FormFieldText";
import FormFieldTextArea from "../fields/FormFieldTextArea";
import FormFieldRoleCombobox from "../fields/FormFieldRoleCombobox";
import FormFieldFile from "../fields/FormFieldFile";
import FormCardContent from "@/components/layout/FormCardContent";
import FormFieldSelect from "../fields/FormFieldSelect";
import { Button } from "@/components/ui/button";
import { useState } from "react";


import { SelectItem } from "@/components/ui/select";


interface ProjectFormProps {
    onSuccess?: () => void;
}

function ProjectForm({ onSuccess}: ProjectFormProps) {

    // const form = useForm({
    //     defaultValues: {
            

    //     },
    //     mode: "all",
    // });








    return (
        <>
        
        </>

    );
};