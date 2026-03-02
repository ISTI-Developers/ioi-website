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
        mutationFn: async ({data, file}: {data: TData; file: File[]}) => {
            const formData = new FormData();
            formData.append("data", JSON.stringify(data));

            file.forEach((f) => formData.append("file[]", f));

            const response = await api.post(`index.php?resource=gallery`, formData);
            response.data; 
        },

        onSuccess: (_data) => {
            queryClient.refetchQueries({ queryKey: ["GALLERY"]});
            toast.success("Successfullt added new gallery images");
        },
        onError: catchError,
    });
}