import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api/config";
import { toast } from "sonner";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { app } from "@/firebase";

export const CLIENT = "clients";

export type Client = {
    client_id?: number;
    client_name: string;
    client_description: string;
    file?: string;
};

export const useClients = () => {
    return useQuery({
        queryKey: [CLIENT],
        queryFn: async () => {
            const res = await api.get(`index.php?resource=${CLIENT}`);
            return res.data;
        },
        staleTime: 10 * 60 * 1000,
    });
};

export const useClient = (id: number) => {
    return useQuery({
        queryKey: [CLIENT, id],
        queryFn: async () => {
            const res = await api.get(`index.php?resource=${CLIENT}&id=${id}`);
            return res.data;
        },
        staleTime: 10 * 60 * 1000,
    });
};

export const useAddClient = <TData = unknown>() => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: TData) => {
            const res = await api.post(`index.php?resource=${CLIENT}`, data, {
                headers: { "Content-Type": "application/json" },
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CLIENT] });
            toast.success("Successfully added new Client");
        },
        onError: (err: any) => {
            console.error("Failed to add client:", err);
            toast.error("Failed to add client");
        },
    });
};

export const useUpdateClient = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: Partial<Client> }) => {
            const res = await api.put(`index.php?resource=${CLIENT}&id=${id}`, data, {
                headers: { "Content-Type": "application/json" },
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CLIENT] });
            toast.success("Client updated successfully");
        },
        onError: (err: any) => {
            console.error("Failed to update client:", err);
            toast.error("Failed to update client");
        },
    });
};

export const useDeleteClient = () => {
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
            const res = await api.delete(`index.php?resource=${CLIENT}&id=${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CLIENT] });
            toast.success("Client deleted successfully");
        },
        onError: (err: any) => {
            console.error("Failed to delete client:", err);
            toast.error("Failed to delete client");
        },
    });
};