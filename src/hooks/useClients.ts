import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, getOne, catchError } from "./controller";
import type { ClientMember } from "@/data/types";
import api from "./api/config";
import { toast } from "sonner";


const CLIENT = "clients";


export const useClients = () => {
    return useQuery({
        queryKey: [CLIENT],
        queryFn: () => getAll<ClientMember[]>(CLIENT),
        select:(data) =>
            data.map((brand) => ({
                ...brand,
                file: brand.file || [],
            })),

        staleTime: 60 * 10 * 1000,
    });
};


export const useClient = (id: number) => {
    return useQuery({
        queryKey: [CLIENT, id],
        queryFn: () => getOne<ClientMember>(CLIENT, id),
        staleTime: 60 * 10 * 1000,
    });
};


export const useAddClient = <TData = unknown>() => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({data, file}: {data: TData; file: File[]}) => {
            const formData = new FormData();
            formData.append("data", JSON.stringify(data));
            
            file.forEach((f) => formData.append("file[]", f));

            const response = await api.post(`index.php?resource=clients`, formData);
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.refetchQueries({ queryKey: ["CLIENT"]});
            toast.success("Successfully added new Client Brand");
        },
        onError: catchError,
    });
};
