import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function AdminLayout() {
    return (
        <div className="min-h-screen bg-white font-sans">
            <Sidebar />
            <div className="p-6">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout;