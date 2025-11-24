import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "./ui/sidebar";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChartNoAxesGantt } from "lucide-react";

export default function NavActions() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Accordion type="single" collapsible defaultValue="item-1"> 
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex items-center gap-4">
                <ChartNoAxesGantt />
                <p className="text-semibold">Quick Menu</p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <nav className="flex flex-col items-center gap-4 p-2">
                <a href="#">Today</a>
                <a href="#">Upcoming</a>
                <a href="#">Completed</a>
                <a href="#">Trash</a>
              </nav>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}