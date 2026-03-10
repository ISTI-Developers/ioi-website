import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api/config";
import { toast } from "sonner";

const CAREER = "careers";

export type Career = {
    career_id?: number;
    career_title: string;
    department: string;
    work_setup: string;
    employment_type: string;
    description: string;
    is_active?: number;
    application_link?: string;
};

export const useCareers = () => {
    return useQuery({
        queryKey: [CAREER],
        queryFn: async () => {
            const res = await api.get(`index.php?resource=${CAREER}`);
            return res.data;
        },
        staleTime: 10 * 60 * 1000,
    });
};

export const useCareer = (id: number) => {
    return useQuery({
        queryKey: [CAREER, id],
        queryFn: async () => {
            const res = await api.get(`index.php?resource=${CAREER}&id=${id}`);
            return res.data;
        },
        staleTime: 10 * 60 * 1000,
    });
};

export const useAddCareer = <TData = unknown>() => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: TData) => {
            const res = await api.post(`index.php?resource=${CAREER}`, data, {
                headers: { "Content-Type": "application/json" },
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CAREER] });
            toast.success("Successfully added new Career");
        },
        onError: (err: any) => {
            console.error("Failed to add career:", err);
            toast.error("Failed to add career");
        },
    });
};

export const useUpdateCareer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: Partial<Career> }) => {
            const res = await api.put(`index.php?resource=${CAREER}&id=${id}`, data, {
                headers: { "Content-Type": "application/json" },
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CAREER] });
            toast.success("Career updated successfully");
        },
        onError: (err: any) => {
            console.error("Failed to update career:", err);
            toast.error("Failed to update career");
        },
    });
};

export const useDeleteCareer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            const res = await api.delete(`index.php?resource=${CAREER}&id=${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CAREER] });
            toast.success("Career deleted successfully");
        },
        onError: (err: any) => {
            console.error("Failed to delete career:", err);
            toast.error("Failed to delete career");
        },
    });
};