"use client";
import {
  SidebarMenu,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Settings } from "lucide-react";
import { Logout } from "@/app/(auth)/action";

export default function NavUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex items-center gap-4">
                <Settings />
                <p className="text-semibold">User Actions</p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <nav className="flex flex-col items-center gap-4 p-2">
                <a href="#">Settings</a>
                <a href="#">Profile</a>
                <Button onClick={Logout} size={'sm'} variant={'destructive'}>Log Out</Button>
              </nav>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
