import {Navigate, Outlet} from "react-router-dom";
import { useAuth } from "@/context/AuthContext";


export function ProtectedRoute() {
    const { isAuthenticated, isLoading} = useAuth();
  console.log("ProtectedRoute →", { isLoading, isAuthenticated, token: localStorage.getItem("token") });

    if(isLoading) return <div>Loading...</div>

    if(!isAuthenticated) return <Navigate to="/login" replace />;


    console.log("TOKEN:", localStorage.getItem("token"));
console.log("AUTH:", isAuthenticated);

    return <Outlet />;
}