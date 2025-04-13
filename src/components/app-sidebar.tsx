import {
  Activity,
  AlertTriangle,
  CalendarCheck,
  LayoutDashboard,
  LogOut,
  Users,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Status Page",
    url: "#",
    icon: LayoutDashboard,
  },
  {
    title: "Services",
    url: "#",
    icon: Activity,
  },
  {
    title: "Incidents",
    url: "#",
    icon: AlertTriangle,
  },
  {
    title: "Maintenances",
    url: "#",
    icon: CalendarCheck,
  },
  {
    title: "Team",
    url: "#",
    icon: Users,
  },
  {
    title: "Logout",
    url: "/auth/logout",
    icon: LogOut,
  },
];

interface AppSidebarProps {
  user: string;
  email: string;
}

export function AppSidebar({ user, email }: AppSidebarProps) {
  return (
    <Sidebar className="bg-slate-900 text-white w-64 min-h-screen shadow-lg">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 pt-1 flex flex-col items-start ">
            <div className="flex items-center gap-0.5">
              <p className="font-semibold text-lg text-gray-200">{user}</p>
              <User className="scale-75" />
            </div>
            <p className="text-sm font-normal text-slate-400">{email}</p>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="border-b border-b-1 pt-10 border-slate-700" />
            <SidebarMenu className="pt-4 space-y-1.5">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center gap-3 px-4 py-3 text-lg font-medium rounded-lg hover:bg-slate-700 transition-all"
                    >
                      <item.icon className="w-6 h-6 text-gray-300" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
