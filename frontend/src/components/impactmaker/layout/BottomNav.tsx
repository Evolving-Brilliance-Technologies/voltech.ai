import { Link, useMatchRoute } from "@tanstack/react-router";
import { Compass, Home, IdCard, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Compass, label: "Explore", path: "/explore" },
  { icon: IdCard, label: "ID", path: "/id", isMain: true },
  { icon: MessageSquare, label: "Messages", path: "/messages" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function BottomNav() {
  const matchRoute = useMatchRoute();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass pb-[env(safe-area-inset-bottom)]">
      <nav className="flex items-center justify-around px-2 h-16 max-w-md mx-auto relative">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = matchRoute({ to: item.path as any });

          return (
            <Link
              key={item.path}
              to={item.path as any}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-full transition-colors",
                isActive
                  ? "text-voltech-green"
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              {item.isMain ? (
                <div className="absolute -top-5 bg-voltech-green text-white p-3.5 rounded-full shadow-lg shadow-voltech-green/30 border-4 border-white">
                  <Icon size={24} />
                </div>
              ) : (
                <>
                  <Icon
                    size={20}
                    className={cn("mb-1", isActive && "stroke-[2.5px]")}
                  />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
