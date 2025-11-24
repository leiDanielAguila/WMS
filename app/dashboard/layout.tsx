import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AppSidebar } from "../../components/appSideBar";
import { getAuthenticatedUser } from "../utils/auth/server-helper";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthenticatedUser();

  const email:string = user.email?.toString() ?? "Unknown";
  return (
    <SidebarProvider>
      <AppSidebar email={email}/>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
