import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { catchError } from "./controller";
import type { Point } from "@/data/types";
import api from "./api/config";
import { toast } from "sonner";



const PROJECTS = "projects";


export const useAddPoint = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: Point) => {           
            const res = await api.post(`index.php?resource=points`, data);
            return res.data;
        },

        onSuccess: (_, variables) => {
            queryClient.refetchQueries({
                queryKey: [PROJECTS, variables.project_id],
            });

            toast.success("Successfully added new Point");
        },

        onError: catchError,

    });
};
