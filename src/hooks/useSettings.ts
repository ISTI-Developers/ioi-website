import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAll, catchError } from "./controller";
import type { Settings } from "@/data/types";
import api from "./api/config";


const SETTINGS = "settings"

export function useSettings(mock = true) {
  return useQuery<Settings[]>({
    queryKey: ["settings"],
    queryFn: async () => {
      if (mock) {
        return [
          { settings_key: "max_images_per_item", value: "5" },
          { settings_key: "currency", value: "PHP" },
        ];
      }
      const res = await fetch("/ioi-website-api/index.php?resource=settings");
      if (!res.ok) throw new Error("Failed to fetch settings");
      return res.json();
    },
  });
}

export const useUpdateSetting = <TData extends {}>() => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: TData }) => {
      const response = await api.put(`index.php?resource=${SETTINGS}`, {
        id: id,
        values: Object.values(data).map((value) => {
          return value;
        }),
        columns: Object.keys(data),
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [SETTINGS] });
    },
    onError: catchError,
  });
};