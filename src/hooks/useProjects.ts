import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, getOne, catchError } from "./controller";
import type { Project, Point, Prose } from "@/data/types";
import api from "./api/config";
import { toast } from "sonner";


export type ProjectWithPointsAndProse = Project & {
    points: Point[];
    prose: Prose[];
};
const PROJECTS = "projects";
const PROJECT_POINTS = "points";
const PROJECT_PROSE = "prose";




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


export const useProjectByIdWithPointsAndProse = (id: number) => {
    return useQuery({
        queryKey: [PROJECTS, id],
        queryFn: () => getOne<ProjectWithPointsAndProse>(PROJECTS, id),
        staleTime: 60 * 10 * 1000,
    });
};

// export const useProjectByProse = (id: number) => {
//     return useQuery({
//         queryKey: [PROJECTS, id, [PROJECT_PROSE]],
//         queryFn: () => getOne<ProjectWithProse>(PROJECTS, id),
//         staleTime: 60 * 10 * 1000
//     });
// };


export const useAddProject = <TData = unknown>() => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: TData) => {
            const res = await api.post(`index.php?resource=${PROJECTS}`, data, {
                headers: { "Content-Type": "application/json" },
            });

            return res.data;
        },

        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [PROJECTS] });
            toast.success("SUccessfully added new Project");
        },
        onError: catchError
    });
};


export const useUpdateProject = <TData extends {}>() => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: number, data: TData }) => {
            const res = await api.put(`index.php?resource=${PROJECTS}&id=${id}`, data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PROJECTS] });
            toast.success("Project updated successfully");
        },
        onError: (err: any) => {
            console.error("Failed to update project:", err);

            toast.error("Failed to update project", err);
        },

    });
};
