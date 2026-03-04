import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, getOne, catchError } from "./controller";
import type { Project, Point } from "@/data/types";
import api from "./api/config";
import { toast } from "sonner";


export type ProjectWithPoints = Project & { points: Point[] };

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

export const useProjectById = (id: number) => {
    return useQuery({
        queryKey: [PROJECTS, id],
        queryFn: () => getOne<Project>(PROJECTS, id),
        staleTime: 60 * 10 * 1000
    });
};


export const useProjectByPoints = (id: number) => {
    return useQuery({
        queryKey: [PROJECTS, id],
        queryFn: () => getOne<ProjectWithPoints>(PROJECTS, id),
        staleTime: 60 * 10 * 1000
    });
};


export const useAddProject = <TData = unknown>() => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: TData) => {    
            const res = await api.post(`index.php?resource=${PROJECTS}`, data, {
                headers: {"Content-Type": "application/json"},
            });

            return res.data;
        },

        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [PROJECTS]});
            toast.success("SUccessfully added new Project");
        },
        onError: catchError
    });
};

