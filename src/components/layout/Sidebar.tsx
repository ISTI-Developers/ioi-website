import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../ui/app-sidebar";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="flex-1 p-6 ">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Sidebar;
