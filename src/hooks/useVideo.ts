import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOne, catchError } from "./controller";
import type { Video } from "@/data/types";
import api from "./api/config";
import { toast } from "sonner";

const VIDEO = "video";


export const useVideo = (id: number) => {
    return useQuery({
        queryKey: [VIDEO, id],
        queryFn: () => getOne<{ video: Video[] }>(VIDEO, id),
        staleTime: 60 * 10 * 1000
    });
}

export const useAddVideo = <TData = unknown>() => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: TData) => {
            const res = await api.post(`index.php?resource=${VIDEO}`, data);
            return res.data;
        },
        onSuccess: (_data) => {
            queryClient.refetchQueries({ queryKey: [VIDEO] });
            toast.success("Successfully added new video");
        },
        onError: catchError,
    });
}


export const useUpdateVideo = <TData extends {}>() => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: number, data: TData }) => {
            const res = await api.put(`index.php?resource=${VIDEO}&id=${id}`, data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            return res.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [VIDEO] });
            toast.success("Video updated successfully");
        },
        onError: (err: any) => {
            console.error("Failed to update video", err);
            toast.error("Failed to update video", err);
        },
    });
};