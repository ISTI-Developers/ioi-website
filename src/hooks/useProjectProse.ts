import { useMutation, useQueryClient } from "@tanstack/react-query";
import { catchError } from "./controller";
import type { Prose } from "@/data/types";
import api from "./api/config";
import { toast } from "sonner";


const PROSE = "prose";
const PROJECTS = "projects"

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
                queryKey: [PROJECTS, variables.project_id],
            });

            toast.success("Successfully added new Prose");
        },

        onError: catchError,
    })
}


export const useUpdateProse = <TData extends {}>() => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: number, data: TData }) => {
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
            queryClient.invalidateQueries({ queryKey: [PROJECTS] });
            toast.success("Prose updated successfully");
        },
        onError: (err: any) => {
            toast.error("Failed to update prose", err);
        },
    });
};



export const useDeleteProse = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const res = await api.delete(`index.php?resource=${PROSE}&id=${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PROJECTS] });
            toast.success("Prose deleted successfully");
        },
        onError: (err: any) => {
            console.error("Failed to delete prose", err);
            toast.error("Failed to delete prose");
        }
    })
}
