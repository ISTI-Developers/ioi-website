import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, getOne, catchError } from "./controller";
import type { TeamMember } from "@/data/types";
import api from "./api/config";
import { toast } from "sonner";

const TEAM = "team";

export const useTeams = () => {
  return useQuery({
    queryKey: [TEAM],
    queryFn: () => getAll<TeamMember[]>(TEAM),
    select: (data) =>
      data.map((member) => ({
        ...member,
        file: member.file ? member.file.split(",").map((img) => img.trim()) : [],
      })),
    staleTime: 60 * 10 * 1000,
  });
};

export const useTeam = (id: number) => {
  return useQuery({
    queryKey: [TEAM, id],
    queryFn: () => getOne<TeamMember>(TEAM, id),
    staleTime: 60 * 10 * 1000,
  });
};


export const useAddTeam = <TData = unknown>() => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, file }: { data: TData; file?: File[] }) => {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      if (file) {
        file.forEach((f) => formData.append("file[]", f));
      }

      const response = await api.post(`index.php?resource=team`, formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [TEAM] });
      toast.success("Successfully added new Team Member");
    },
    onError: catchError,
  });
};


export const useUpdateTeam = <TData extends {}>() => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: TData }) => {
      const response = await api.put(`index.php?resource=team`, {
        id,
        values: Object.values(data),
        columns: Object.keys(data),
      });
      return response.data;
    },
    onSuccess: () => queryClient.refetchQueries({ queryKey: [TEAM] }),
    onError: catchError,
  });
};

export const useDeleteTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`index.php?resource=team`, {
        params: { id },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [TEAM] });
      toast.success("Successfully deleted Team Member");
    },
    onError: catchError,
  });
};
