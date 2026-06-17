import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  LoginSchema,
  MeResponseSchema,
  LoginResponseSchema,
} from "@/data/schemas";
import type { Login } from "@/data/types";
import api from "./api/config";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AUTH = "auth";

export const useMe = () => {
  return useQuery({
    queryKey: [AUTH],
    queryFn: async () => {
      const res = await api.get(`auth/me.php`);

      const result = MeResponseSchema.safeParse(res.data);
      if (!result.success) {
        throw new Error("Invalid auth response shape");
      }

      return result.data;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Login) => {
      const parsed = LoginSchema.parse(data);
      const res = await api.post(`auth/login.php`, parsed);

      const result = LoginResponseSchema.safeParse(res.data);
      if (!result.success) {
        throw new Error("Invalid response format from server");
      }

      return result.data;
    },

    onSuccess: (data) => {
      queryClient.setQueryData([AUTH], { user: data.user });
      toast.success("Login successful");
    },

    onError: (err: any) => {
      toast.error(err.message || "Invalid credentials");
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.post(`auth/logout.php`);
    },

    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [AUTH] });
      toast.success("Logged out");
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });
};

export function useAutoLogout() {
  const location = useLocation();
  const { mutate: logout } = useLogout();
  const { data: auth } = useMe();

  useEffect(() => {
    if (!location.pathname.startsWith("/admin") && auth?.user) {
      logout();
    }
  }, [location.pathname]);
}
