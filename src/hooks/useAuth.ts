import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api, { setSession } from "./api/config";
import { toast } from "sonner";
import type { Login, AdminUser, AuthResponse } from "@/data/types";
import { AuthResponseSchema, LoginSchema } from "@/data/schemas";

const AUTH = "auth";

export const useMe = () => {
  return useQuery({
    queryKey: [AUTH],
    queryFn: async () => {
      const token = localStorage.getItem("token");

      if (!token) throw new Error("No token found");

      setSession(token);

      const res = await api.get("index.php?resource=auth");

      return AuthResponseSchema.parse(res.data);
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

            console.log("LOGIN PAYLOAD:", data);
            const parsed = LoginSchema.parse(data);

            const res = await api.post(
                "index.php?resource=auth",
                parsed,
                { headers: { "Content-Type": "application/json" } }
            );

            const responseData = res.data;

            if (responseData?.error || responseData?.[0] === 401) {
                throw new Error(responseData.error || "Login failed");
            }

            const result = AuthResponseSchema.safeParse(responseData);

            if (!result.success) {
                console.log(result.error);
                throw new Error("Invalid response format from server");
            }

            return result.data;
        },

        onSuccess: (data: AuthResponse) => {
            localStorage.setItem("token", data.accessToken);
            setSession(data.accessToken);
            queryClient.setQueryData([AUTH], data);
            toast.success("Login successful");
        },

        onError: (err: any) => {
            console.error("Login failed:", err.message);
            toast.error(err.message || "Invalid credentials");
        },
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            localStorage.removeItem("token");
            setSession(null); 
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

