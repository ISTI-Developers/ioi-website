import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOne, catchError } from "./controller";
import type { Video } from "@/data/types";
import api from "./api/config";
import { toast } from "sonner";

const VIDEO = "video";


export const useVideo = (id: number) => {
    return useQuery({
        queryKey: [VIDEO, id],
        queryFn: () => getOne<{ video: Video[]}>(VIDEO, id),
        staleTime: 60 * 10 * 1000
    });
}

