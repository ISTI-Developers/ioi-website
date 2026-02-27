import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, getOne, catchError } from "./controller";
import type { Banner } from "@/data/banner_columns";
import api from "./api/config";
import { toast } from "sonner";

const BANNER = "banners";

export const useBanners = () => {
    return useQuery({
        queryKey: [BANNER],
        queryFn: () => getAll<Banner[]>(BANNER),
        staleTime: 60 * 10 * 1000,
    });
};

export const useBanner = (id: number) => {
    return useQuery({
        queryKey: [BANNER, id],
        queryFn: () => getOne<Banner>(BANNER, id),
        staleTime: 60 * 10 * 1000,
    });
};

export const useAddBanner = <TData = unknown>() => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ data, file }: { data: TData; file: File[] }) => {
            const formData = new FormData();
            formData.append("data", JSON.stringify(data));
            file.forEach((f) => formData.append("file[]", f));

            const response = await api.post(`index.php?resource=banners`, formData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [BANNER] });
            toast.success("Successfully added new Banner");
        },
        onError: catchError,
    });
};