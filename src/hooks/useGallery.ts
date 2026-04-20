import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOne, catchError } from "./controller";
import type { Gallery } from "@/data/types";
import api from "./api/config";
import { toast } from "sonner";


const GALLERY = "gallery";


export const useGallery  = (id: number) => {
    return useQuery({
        queryKey: [GALLERY, id],
        queryFn: () => getOne<{ gallery: Gallery[] }>(GALLERY, id),
        staleTime: 60 * 10 * 1000
    });
};


export const useAddGallery = <TData=unknown>() => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: TData) => {
            const res = await api.post(`index.php?resource=${GALLERY}`, data);
            return res.data;
        },
        onSuccess: (_data) => {
            queryClient.refetchQueries({ queryKey: [GALLERY] });
            toast.success("Successfully added new gallery images");
        },
        onError: catchError,
    });
}

export const useUpdateGallery = <TData extends {}>() => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data}: { id: number, data: TData}) => {
            const res = await api.put(`index.php?resource=${GALLERY}&id=${id}`, data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            return res.data;

        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [GALLERY]});
            toast.success("Gallery updated successfully");
        },
        onError: (err: any) => {
            console.error("Failed to update gallery", err);

            toast.error("Failed to update gallery", err);
        },
    });
};


export const useDeleteGallery = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const res = await api.delete(`index.php?resource=${GALLERY}&id=${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [GALLERY]});
            toast.success("Gallery deleted successfully");
        },
        onError: (err: any) => {
            console.error("Failed to delete gallery", err);
            toast.error("Failed to delete gallery")
        },
    });
};