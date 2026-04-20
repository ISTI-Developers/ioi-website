import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api, { setSession } from "./api/config";
import { toast } from "sonner";
import type { Login, AuthResponse } from "@/data/types";
import { AuthResponseSchema, LoginSchema } from "@/data/schemas";

const AUTH = "auth";

export const useMe = () => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: [AUTH],
    enabled: !!token,
 queryFn: async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token");

  setSession(token);
  const res = await api.get("index.php?resource=auth");
  console.log("RAW /auth response:", JSON.stringify(res.data, null, 2));

  const result = AuthResponseSchema.safeParse(res.data);
  if (!result.success) {
    console.error("Schema mismatch:", result.error.flatten());
    throw new Error("Invalid auth response shape");
  }

  // if server rotates the token on /auth, save the new one
  if (result.data.accessToken) {
    localStorage.setItem("token", result.data.accessToken);
    setSession(result.data.accessToken);
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
    },
  });
};