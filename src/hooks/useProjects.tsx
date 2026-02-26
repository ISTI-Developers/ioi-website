import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, getOne, catchError } from "./controller";
import type { Project } from "@/data/types";
import api from "./api/config";
import { toast } from "sonner";


const PROJECTS = "projects";

export const useProjects = () => {
    return useQuery({
        queryKey: [PROJECTS],
        queryFn: () => getAll<Project[]>(PROJECTS),
        select: (data) =>
            data.map((project) => ({
                ...project
            })),
        staleTime: 60 * 10 * 1000,
    });
};


export const useProject = (id: number) => {
    return useQuery({
        queryKey: [PROJECTS, id],
        queryFn: () => getOne<Project>(PROJECTS, id),
        staleTime: 60 * 10 * 1000
    });
};


// export const useAddProject = <TData = unknown>() => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: async ({ data})

//     });
// };

