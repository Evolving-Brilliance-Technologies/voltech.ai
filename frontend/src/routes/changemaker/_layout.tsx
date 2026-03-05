import {
  createFileRoute,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import {
  Briefcase,
  Calendar,
  FileText,
  LayoutDashboard,
  LogOut,
  Monitor,
  Moon,
  Settings,
  Sun,
  Users,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Sidebar, type SidebarItem } from "@/components/ui/sidebar";
import { TopBar } from "@/components/ui/top-bar";

export const Route = createFileRoute("/_layout")({
  component: LayoutComponent,
});

function LayoutComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

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
    {
      name: "Logs",
      href: "/logs",
      icon: <FileText />,
      description: "System activity logs",
    },
  ];

  const getPageTitle = () => {
    const currentNav = mainNavigation.find(nav => nav.href === pathname);
    return currentNav ? currentNav.name : "Dashboard";
  };

  const themeOptions = [
    { value: "light" as const, label: "Light", icon: Sun },
    { value: "dark" as const, label: "Dark", icon: Moon },
    { value: "system" as const, label: "System", icon: Monitor },
  ];

  return (
    <div className="flex h-screen bg-[#F9FAFB] dark:bg-[#0B1120] overflow-hidden flex-col ">
      {/* Top Bar */}
      <TopBar
        className="border-b dark:border-white/5"
        size={"large"}
        left={
          <TopBar.Logo
            href="/"
            size={"large"}
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

                {/* Logo Image - Slides left */}
                <div className="absolute inset-0 bg-voltech-green transition-transform duration-300 ease-out group-hover:-translate-x-full z-10 shadow-sm flex items-center justify-center">
                  <img
                    src="/assets/logos/logo-white.png"
                    alt="Voltech.ai Logo"
                    className="h-14 w-14 object-contain"
                  />
                </div>
              </div>
            }
          >
            <div className="overflow-hidden transition-all duration-300 max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:pl-3 whitespace-nowrap">
              <span className="font-display font-bold text-2xl text-voltech-green dark:text-emerald-400">
                Voltech.ai
              </span>
            </div>
          </TopBar.Logo>
        }
        center={
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {getPageTitle()}
          </h1>
        }
        right={
          <TopBar.Actions>
            <TopBar.UserMenu
              avatarClassName="bg-voltech-green text-white"
              name="NGO Admin"
              email="admin@ngo.org"
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
            </TopBar.UserMenu>
          </TopBar.Actions>
        }
      />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar size="medium">
          <Sidebar.Nav
            items={mainNavigation}
            currentPath={pathname}
            onNavigate={(href: string) => {
              navigate({ to: href });
            }}
          />
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
