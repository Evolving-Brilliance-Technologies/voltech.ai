import { Link, useMatchRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
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
    <div className="fixed bottom-0 left-0 right-0 z-50 glass dark:bg-linear-to-t dark:from-black/90 dark:to-slate-900/80 dark:border-white/5 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
      <nav className="flex items-center justify-around px-2 h-16 max-w-md mx-auto relative transition-all duration-300">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = matchRoute({ to: item.path as any });

          return (
            <Link
              key={item.path}
              to={item.path as any}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-full transition-colors relative",
                isActive
                  ? "text-voltech-green dark:text-emerald-400"
                  : "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              <div className="flex flex-col items-center justify-center">
                {item.isMain ? (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-voltech-green text-white p-3.5 rounded-full shadow-lg shadow-voltech-green/30 border-4 border-white dark:border-slate-900 transition-transform">
                    <Icon size={24} />
                  </div>
                ) : (
                  <>
                    <Icon
                      size={20}
                      className={cn(
                        "mb-1 transition-all",
                        isActive && "stroke-[2.5px]"
                      )}
                    />
                    <span className="text-[10px] font-semibold tracking-tight">
                      {item.label}
                    </span>
                  </>
                )}
              </div>
              {isActive && !item.isMain && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-1 w-1 h-1 rounded-full bg-voltech-green dark:bg-emerald-400"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
