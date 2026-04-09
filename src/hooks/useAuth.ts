import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api/config";
import { toast } from "sonner";
import type { Login, AdminUser, AuthResponse } from "@/data/types";
import { AuthResponseSchema, LoginSchema } from "@/data/schemas";

const AUTH = "auth";


export const useMe = () => {
    return useQuery({
        queryKey: [AUTH],
        queryFn: async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No token found");
            }

            const res = await api.get(`index.php?resource=auth`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            return AuthResponseSchema.parse(res.data);
        },

        retry: false
    });
};


export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: Login) => {
            const parsed = LoginSchema.parse(data);

            const res = await api.post(`index.php?resource=auth`, parsed, {
                headers: { "Content-Type": "application/json" }
            });

            return AuthResponseSchema.parse(res.data);
        },

        onSuccess: (data: AuthResponse) => {
            localStorage.setItem("token", data.token);

            queryClient.setQueryData([AUTH], data);
            toast.success("Login successful");
        },
        onError: (err: any) => {
            console.error("Login failed:", err);
            toast.error("Invalid credentials");
        }
    })

};


export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem("token");
      return true;
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [AUTH] });
      toast.success("Logged out");
    },
    onError: (err: any) => {
      console.error("Logout failed:", err);
      toast.error("Logout failed");
    }
  });
};

