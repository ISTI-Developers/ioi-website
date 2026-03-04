import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api/config";
import { toast } from "sonner";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { app } from "@/firebase";

export const BANNER = "banners";

export type Banner = {
    banner_id?: number;
    section: string;
    file?: string;
    year: string;
    text: string;
};

export const useBanners = () => {
    return useQuery({
        queryKey: [BANNER],
        queryFn: async () => {
            const res = await api.get(`index.php?resource=${BANNER}`);
            return res.data;
        },
        staleTime: 10 * 60 * 1000,
    });
};

export const useBanner = (id: number) => {
    return useQuery({
        queryKey: [BANNER, id],
        queryFn: async () => {
            const res = await api.get(`index.php?resource=${BANNER}&id=${id}`);
            return res.data;
        },
        staleTime: 10 * 60 * 1000,
    });
};

export const useAddBanner = <TData = unknown>() => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: TData) => {
            const res = await api.post(`index.php?resource=${BANNER}`, data, {
                headers: { "Content-Type": "application/json" },
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [BANNER] });
            toast.success("Successfully added new Banner");
        },
        onError: (err: any) => {
            console.error("Failed to add banner:", err);
            toast.error("Failed to add banner");
        },
    });
};

export const useUpdateBanner = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: Partial<Banner> }) => {
            const res = await api.put(`index.php?resource=${BANNER}&id=${id}`, data, {
                headers: { "Content-Type": "application/json" },
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [BANNER] });
            toast.success("Banner updated successfully");
        },
        onError: (err: any) => {
            console.error("Failed to update banner:", err);
            toast.error("Failed to update banner");
        },
    });
};

export const useDeleteBanner = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, fileUrl }: { id: number; fileUrl?: string }) => {
            if (fileUrl && fileUrl.includes("firebasestorage.googleapis.com")) {
                try {
                    const storage = getStorage(app);
                    const fileRef = ref(storage, fileUrl);
                    await deleteObject(fileRef);
                } catch (err) {
                    console.warn("Firebase delete failed:", err);
                }
            }
            const res = await api.delete(`index.php?resource=${BANNER}&id=${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [BANNER] });
            toast.success("Banner deleted successfully");
        },
        onError: (err: any) => {
            console.error("Failed to delete banner:", err);
            toast.error("Failed to delete banner");
        },
    });
};