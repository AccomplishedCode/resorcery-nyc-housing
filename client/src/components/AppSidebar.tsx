import { useLocation } from "wouter";
import { Link } from "wouter";
import { 
  MapIcon, Building2, BarChart2, LeafIcon, Calculator, 
  Book, HeartHandshake, BrainCircuit, HomeIcon
} from "lucide-react";

import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter
} from "@/components/ui/sidebar";

const navItems = [
  { path: "/", title: "Home", icon: <HomeIcon className="size-4" /> },
  { path: "/opportunity-finder", title: "Opportunity Finder", icon: <MapIcon className="size-4" /> },
  { path: "/development-scenarios", title: "Development Scenarios", icon: <Building2 className="size-4" /> },
  { path: "/neighborhood-impact", title: "Neighborhood Impact", icon: <BarChart2 className="size-4" /> },
  { path: "/environmental-impact", title: "Environmental Impact", icon: <LeafIcon className="size-4" /> },
  { path: "/affordability-calculator", title: "Affordability Calculator", icon: <Calculator className="size-4" /> },
  { path: "/policy-lab", title: "Policy Lab", icon: <Book className="size-4" /> },
  { path: "/community-benefit-analyzer", title: "Community Benefits", icon: <HeartHandshake className="size-4" /> },
  { path: "/ai-assistant-chat", title: "AI Assistant", icon: <BrainCircuit className="size-4" /> }
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader className="border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer py-1">
                <div className="bg-[#0A5796] text-white w-8 h-8 rounded-md flex items-center justify-center">
                  <HomeIcon className="size-5" />
                </div>
                <span className="font-heading font-bold text-xl text-[#0A5796]">Resorcery</span>
              </div>
            </Link>
            <SidebarTrigger />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <Link href={item.path}>
                  <SidebarMenuButton
                    data-active={location === item.path}
                    className="hover:bg-gray-100 hover:text-[#0A5796] data-[active=true]:bg-[#0A5796] data-[active=true]:text-white"
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t border-sidebar-border">
          <div className="px-3 py-2 text-xs text-gray-500">
            Resorcery © {new Date().getFullYear()}
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}