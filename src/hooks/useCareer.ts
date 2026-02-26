import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, getOne, catchError } from "./controller";
import type { Career } from "@/data/career_columns";
import api from "./api/config";
import { toast } from "sonner";

const CAREER = "careers";

export const useCareers = () => {
    return useQuery({
        queryKey: [CAREER],
        queryFn: () => getAll<Career[]>(CAREER),
        staleTime: 60 * 10 * 1000,
    });
};

export const useCareer = (id: number) => {
    return useQuery({
        queryKey: [CAREER, id],
        queryFn: () => getOne<Career>(CAREER, id),
        staleTime: 60 * 10 * 1000,
    });
};

export const useAddCareer = <TData = unknown>() => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ data, file }: { data: TData; file: File[] }) => {
            const formData = new FormData();
            formData.append("data", JSON.stringify(data));

            file.forEach((f) => formData.append("file[]", f));

            const response = await api.post(`index.php?resource=careers`, formData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [CAREER] });
            toast.success("Successfully added new Career");
        },
        onError: catchError,
    });
};

export const useUpdateCareer = <TData = unknown>() => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ data, file }: { data: TData; file: File[] }) => {
            const formData = new FormData();
            formData.append("data", JSON.stringify(data));

            file.forEach((f) => formData.append("file[]", f));

            const response = await api.put(`index.php?resource=careers`, formData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [CAREER] });
            toast.success("Successfully updated Career");
        },
        onError: catchError,
    });
};

export const useDeleteCareer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const response = await api.delete(`index.php?resource=careers&career_id=${id}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [CAREER] });
            toast.success("Successfully deleted Career");
        },
        onError: catchError,
    });
};