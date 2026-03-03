import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api/config";
import { toast } from "sonner";

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
      queryClient.refetchQueries({ queryKey: [BANNER] });
      toast.success("Successfully added new Banner");
    },
    onError: (err: any) => {
      console.error("Failed to add banner:", err);
      toast.error("Failed to add banner");
    },
  });
};