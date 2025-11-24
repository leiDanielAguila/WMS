import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavUser from "./nav-user";
import NavActions from "./nav-actions";

export function AppSidebar({ name }: { name: string }) {
  return (
    <Sidebar>
      <SidebarHeader className="pt-16">
        <div className="flex items-center gap-4">
          <Avatar className="ml-16">
            <AvatarImage src="/user-fallback.svg" />
            <AvatarFallback className="">
              {name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="text-sm font-semibold">{name}</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <NavActions />
        </SidebarGroup>
        <SidebarGroup>
          <NavUser />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
