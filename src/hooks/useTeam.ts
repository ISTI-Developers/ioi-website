import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api/config";
import { toast } from "sonner";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { app } from "@/firebase";

const TEAM = "team";
const ROLES = "roles";

export type Team = {
  team_id?: number;
  employee_id: number;
  first_name: string;
  last_name: string;
  position: string;
  is_mancomm?: number;
  quote?: string;
  role_id?: number;
  role_name?: string;
  file?: string [];
};

export const useTeams = () => {
  return useQuery({
    queryKey: [TEAM],
    queryFn: async ()=> {
      const res = await api.get(`index.php?resource=${TEAM}`);
      console.log("API response:", res.data); 

      if (Array.isArray(res.data)) return res.data;          
      if (Array.isArray(res.data?.data)) return res.data.data;
      if (Array.isArray(res.data?.results)) return res.data.results; 

      return [];
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const useRoles = () => {
  return useQuery({
    queryKey: [ROLES],
    queryFn: async () => {
      const res = await api.get(`index.php?resource=${ROLES}`);
      return res.data;
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const useTeam = (id: number) => {
  return useQuery({
    queryKey: [TEAM, id],
    queryFn: async () => {
      const res = await api.get(`index.php?resource=${TEAM}&id=${id}`);
      return res.data;
    },
    staleTime: 60 * 10 * 1000,
  });
};



export const useAddTeam = <TData = unknown>() => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TData) => {
      const res = await api.post(`index.php?resource=${TEAM}`, data, {
        headers: {"Content-Type": "application/json" },
      });
      return res.data;
    },
    onSuccess: (_data) => {
      queryClient.invalidateQueries({ queryKey: [TEAM] });
      toast.success("Successfully added new Team Member");
    },
    onError: (err:any) => {
      console. error("Failed to add team member:", err);
      toast.error("Failed to add team member");
    },
  });
};


// Backup
// export const useAddTeam = <TData = unknown>() => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ data, file }: { data: TData; file: File[] }) => {
//       const formData = new FormData();
//       formData.append("data", JSON.stringify(data));

//       file.forEach((f) => formData.append("file[]", f));

//       const response = await api.post(`index.php?resource=team`, formData);
//       return response.data;
//     },
//     onSuccess: (data) => {
//       queryClient.refetchQueries({ queryKey: ["TEAM"] });
//       toast.success("Successfully added new Team Member");
//     },
//     onError: catchError,
//   });
// };


export const useUpdateTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data, }: { id: number; data: Partial<Team>; oldFiles?: string[]}) => {
      const res = await api.put(`index.php?resource=${TEAM}&id=${id}`, data, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    },
    onSuccess: () => queryClient.refetchQueries({ queryKey: [TEAM] }),
    onError: (err: any) => {
      console.error("Failed to update team member:", err);
      toast.error("Failed to update team member");
  },
  });
};

export const useDeleteTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, fileUrl }: { id: number; fileUrl?: string[] }) => {

      if (fileUrl && fileUrl.length > 0) {
        const storage = getStorage(app);
        await Promise.all(
          fileUrl
            .filter((url) => url.includes("firebasestorage.googleapis.com"))
            .map(async (url) => {
              try {
                const fileRef = ref(storage, url);
                await deleteObject(fileRef);
              } catch (err) {
                console.warn("Firebase delete failed:", err);
              }
            })
        );
      }
      const res = await api.delete(`index.php?resource=${TEAM}&id=${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TEAM] });
      toast.success("Successfully deleted Team Member");
    },
    onError: (err: any) => {
      console.error("Failed to delete team member:", err);
      toast.error("Failed to delete team member");
    },
  });
};

