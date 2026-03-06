import {
  createFileRoute,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import {
  Briefcase,
  Calendar,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Monitor,
  Moon,
  Settings,
  Sun,
  Users,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Sidebar, type SidebarItem, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_layout")({
  component: LayoutComponent,
});

function LayoutComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  // const { theme, setTheme } = useTheme();

  const pathname = location.pathname;

  const mainNavigation: SidebarItem[] = [
    {
      name: "Dashboard",
      href: "/",
      icon: <LayoutDashboard />,
      description: "Overview",
    },
    {
      name: "Events",
      href: "/events",
      icon: <Calendar />,
      description: "Manage volunteering events",
    },
    {
      name: "Jobs",
      href: "/jobs",
      icon: <Briefcase />,
      description: "Publish and manage jobs",
    },
    {
      name: "Users",
      href: "/users",
      icon: <Users />,
      description: "Manage talents and volunteers",
    },
  ];

  /* 
  const getPageTitle = () => {
    const currentNav = mainNavigation.find(nav => nav.href === pathname);
    return currentNav ? currentNav.name : "Dashboard";
  };
  */

  const themeOptions = [
    { value: "light" as const, label: "Light", icon: Sun },
    { value: "dark" as const, label: "Dark", icon: Moon },
    { value: "system" as const, label: "System", icon: Monitor },
  ];

  const UserMenuWrapper = () => {
    const { theme, setTheme } = useTheme();

    return (
      <Sidebar.UserMenu
        name="NGO Admin"
        email="admin@ngo.org"
        avatarClassName="bg-voltech-green text-white"
        showUserInfo={true}
        side="right"
        align="end"
      >
        <button
          type="button"
          className="w-full px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5 transition-colors flex items-center gap-2 text-sm dark:text-gray-300"
          onClick={() => {}}
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>

        <div className="flex px-2 py-2 gap-1">
          {themeOptions.map(option => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                className={`flex-1 flex items-center justify-center space-x-1 px-2 py-2 text-[10px] font-bold transition-colors rounded-md ${
                  theme === option.value
                    ? "bg-voltech-mint text-voltech-green border border-voltech-green/20 dark:bg-voltech-green/20 dark:text-emerald-400 dark:border-voltech-green/30"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10"
                }`}
                onClick={() => setTheme(option.value)}
                type="button"
              >
                <Icon className="h-3 w-3" />
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>

        <DropdownMenuSeparator className="dark:bg-white/10" />

        <button
          type="button"
          className="w-full px-4 py-2 cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2 text-sm text-red-500"
          onClick={() => {}}
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </Sidebar.UserMenu>
    );
  };

  const BrandLogo = () => {
    const { isCollapsed } = useSidebar();

    return (
      <Sidebar.Logo
        href="/"
        size="large"
        className="group"
        logo={
          <div className="relative h-20 w-20 shrink-0 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center bg-voltech-green/10 rounded-none border border-voltech-green/20">
              <div className="relative inline-block h-14 w-14">
                <div
                  className="absolute inset-0 bg-voltech-green"
                  style={{
                    maskImage: 'url("/assets/logos/logo-white.png")',
                    WebkitMaskImage: 'url("/assets/logos/logo-white.png")',
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                  }}
                />
              </div>
            </div>

            <div
              className={cn(
                "absolute inset-0 bg-voltech-green transition-transform duration-300 ease-out z-10 shadow-sm flex items-center justify-center",
                isCollapsed
                  ? "group-hover:-translate-x-full"
                  : "-translate-x-full"
              )}
            >
              <img
                src="/assets/logos/logo-white.png"
                alt="Voltech.ai Logo"
                className="h-14 w-14 object-contain"
              />
            </div>
          </div>
        }
      >
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 whitespace-nowrap",
            isCollapsed
              ? "max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:pl-3"
              : "max-w-xs opacity-100 pl-3"
          )}
        >
          <span className="font-display font-bold text-2xl text-voltech-green dark:text-emerald-400">
            Voltech.ai
          </span>
        </div>
      </Sidebar.Logo>
    );
  };

  return (
    <div className="flex h-screen bg-[#F9FAFB] dark:bg-[#0B1120] overflow-hidden flex-col ">
     
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar size="medium">
          <Sidebar.Header className="h-20 flex items-center overflow-hidden">
            <BrandLogo />
          </Sidebar.Header>
          <Sidebar.Nav
            items={mainNavigation}
            currentPath={pathname}
            onNavigate={(href: string) => {
              navigate({ to: href });
            }}
          />
          <Sidebar.Footer className="flex flex-col gap-1 pb-2">
            <Sidebar.Item
              icon={<MessageSquare />}
              label="Messages"
              description="Your conversations"
              onClick={() => navigate({ to: "/messages" as any })}
              isActive={pathname === "/messages"}
              className="mt-1"
            />
            <div className="px-1 items-center">
              <UserMenuWrapper />
            </div>
          </Sidebar.Footer>
        </Sidebar>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-y-auto bg-[#F9FAFB] dark:bg-[#0B1120] transition-colors duration-300">
          <main className="flex-1 p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
