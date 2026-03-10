import { useMutation, useQueryClient } from "@tanstack/react-query";
import { catchError } from "./controller";
import type { Prose } from "@/data/types";
import api from "./api/config";
import { toast } from "sonner";


const PROJECTS = "prose";

export const useAddProse = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: Prose) => {
            const res = await api.post(`index.php?resource=prose`, data, {
            headers: { "Content-Type": "application/json" },
            });
            
            return res.data;

        },

        onSuccess: (_, variables) => {
            queryClient.refetchQueries({
                queryKey: [PROJECTS, variables.project_id],
            });

            toast.success("Successfully added new Prose");
        },

        onError: catchError,
    })


}