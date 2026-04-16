import { useMutation, useQueryClient } from "@tanstack/react-query";
import { catchError } from "./controller";
import type { Prose } from "@/data/types";
import api from "./api/config";
import { toast } from "sonner";


const PROSE = "prose";

export const useAddProse = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: Prose) => {
                console.log("Sending data:", JSON.stringify(data)); 

            const res = await api.post(`index.php?resource=prose`, data, {
            headers: { "Content-Type": "application/json" },
            });
            
            return res.data;

        },

        onSuccess: (_, variables) => {
            queryClient.refetchQueries({
                queryKey: [PROSE, variables.project_id],
            });

            toast.success("Successfully added new Prose");
        },

        onError: catchError,
    })
}


export const useUpdateProse = <TData extends {}>() => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({id, data}: {id: number, data: TData}) => {
            console.log("Data being sent:", data); 
            const res = await api.put(`index.php?resource=${PROSE}&id=${id}`, data, 
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PROSE]});
            toast.success("Prose updated successfully");
        },
        onError: (err: any) => {
            toast.error("Failed to update prose", err);
        },
    });
};