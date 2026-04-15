import { useMutation, useQueryClient } from "@tanstack/react-query";
import { catchError } from "./controller";
import type { Point } from "@/data/types";
import api from "./api/config";
import { toast } from "sonner";



const PROJECTS = "projects";
const POINTS = "points";


export const useAddPoint = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: Point) => {
            const res = await api.post(`index.php?resource=${POINTS}`, data);
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


export const useUpdatePoint = <TData extends {}>() => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: TData }) => {
            const res = await api.put(`index.php?resource=${POINTS}&id=${id}`, data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [POINTS] });
            toast.success("Point updated successfully");
        },
        onError: (err: any) => {
            toast.error("Failed to update point", err);
        },
    });
};

