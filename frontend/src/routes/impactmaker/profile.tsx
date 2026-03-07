import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Coins,
  LogOut,
  Monitor,
  Moon,
  Palette,
  RefreshCw,
  Settings,
  Shield,
  Sun,
  Target,
  UserCircle,
} from "lucide-react";
import { Header } from "@/components/impactmaker/layout/Header";
import { useTheme } from "@/components/theme-provider";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

const themeOptions = [
  { value: "light" as const, label: "Light", icon: Sun },
  { value: "dark" as const, label: "Dark", icon: Moon },
  { value: "system" as const, label: "System", icon: Monitor },
];

function Profile() {
  const { theme, setTheme } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col w-full h-fit flex-1"
    >
      <Header title="Profile" />

      <div className="px-4 md:px-0 py-3 md:py-8 relative z-30 bg-[#FAFAFA]/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-100 dark:border-white/5 md:border-none">
        <div className="hidden md:block mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-display">
            Your Profile
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your account details and preferences.
          </p>
        </div>
      </div>

      <main className="flex-1 px-4 md:px-0 py-6 md:py-0 w-full mb-8 pb-32 md:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Profile & Quick Actions */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            {/* Profile Header */}
            <div className="bg-white dark:bg-slate-900/50 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/5 flex flex-col items-center text-center gap-4">
              <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden shadow-sm">
                <img
                  src="https://picsum.photos/seed/alex/150/150"
                  alt="Profile"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col items-center">
                <h2 className="font-display text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                  Alex Chen
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-800 px-3 py-1 rounded-full">
                  alex.chen@example.com
                </p>
              </div>
              <button
                type="button"
                className="w-full mt-2 bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 font-medium py-2.5 rounded-xl border border-gray-100 dark:border-white/5 flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                <Settings size={18} />
                Edit Profile
              </button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-voltech-dark text-white rounded-3xl p-5 shadow-md active:scale-[0.98] transition-transform cursor-pointer flex flex-col items-center text-center">
                <Coins size={32} className="text-yellow-400 mb-3" />
                <h3 className="font-display font-bold text-2xl mb-1 mt-auto">
                  1,250
                </h3>
                <p className="text-[11px] text-white/70 font-medium uppercase tracking-wider">
                  Voltech Coins
                </p>
              </div>
              <div className="bg-voltech-mint text-voltech-green dark:bg-emerald-900/20 dark:text-emerald-400 rounded-3xl p-5 shadow-sm active:scale-[0.98] transition-transform cursor-pointer flex flex-col items-center text-center">
                <RefreshCw size={32} className="mb-3" />
                <h3 className="font-semibold text-lg mb-1 mt-auto">Exchange</h3>
                <p className="text-[11px] opacity-80 font-medium uppercase tracking-wider">
                  Rewards
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Menu List */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col space-y-6">
            <div className="bg-white dark:bg-slate-800/40 rounded-3xl shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden flex-1">
              <MenuItem
                icon={Target}
                title="My Goals"
                subtitle="Track your ESG/SDG targets and visualize progress"
                color="text-blue-500 dark:text-blue-400"
                bg="bg-blue-50/50 dark:bg-blue-900/30"
              />
              <div className="h-px bg-gray-100 dark:bg-white/10 mx-6" />
              <MenuItem
                icon={UserCircle}
                title="Personal Info"
                subtitle="Update your contact details and bio"
                color="text-purple-500 dark:text-purple-400"
                bg="bg-purple-50/50 dark:bg-purple-900/30"
              />
              <div className="h-px bg-gray-100 dark:bg-white/10 mx-6" />
              <MenuItem
                icon={Shield}
                title="Privacy & Security"
                subtitle="Manage session history and visibility"
                color="text-emerald-500 dark:text-emerald-400"
                bg="bg-emerald-50/50 dark:bg-emerald-900/30"
              />
              <div className="h-px bg-gray-100 dark:bg-white/10 mx-6" />
              <div className="flex flex-row items-center justify-between gap-4 p-4 lg:px-6 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-orange-50/50 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                    <Palette size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      Theme Preference
                    </h4>
                    <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">
                      Choose your interface color schema
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex bg-gray-100 dark:bg-slate-800 p-1 rounded-xl shrink-0">
                  {themeOptions.map(option => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-colors rounded-lg ${
                          theme === option.value
                            ? "bg-white text-gray-900 shadow-sm dark:bg-slate-700 dark:text-white"
                            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        }`}
                        onClick={() => setTheme(option.value)}
                        type="button"
                      >
                        <Icon size={14} />
                        <span className="hidden sm:inline">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="sm:hidden relative shrink-0">
                  <select
                    value={theme}
                    onChange={e => setTheme(e.target.value as any)}
                    className="appearance-none bg-gray-50 dark:bg-slate-800/50 text-gray-900 dark:text-white px-3 py-2 rounded-xl font-semibold text-xs border border-gray-200 dark:border-white/10 pr-8 focus:outline-none focus:ring-2 focus:ring-voltech-green/50"
                  >
                    {themeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2.5 pointer-events-none text-gray-500 dark:text-gray-400">
                    <ChevronRight size={14} className="rotate-90" />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full bg-white dark:bg-slate-800/40 text-red-500 dark:text-red-400 font-semibold py-4 rounded-3xl flex items-center justify-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/20 active:scale-[0.98] transition-all duration-300 border border-gray-100 dark:border-white/10 shadow-sm"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </main>
    </motion.div>
  );
}

function MenuItem({
  icon: Icon,
  title,
  subtitle,
  color,
  bg,
}: {
  icon: any;
  title: string;
  subtitle: string;
  color: string;
  bg: string;
}) {
  return (
    <div className="flex items-center gap-4 p-4 lg:px-6 active:bg-gray-50 dark:active:bg-slate-800 transition-colors cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 group">
      <div
        className={`w-10 h-10 ${bg} ${color} rounded-xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform`}
      >
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-voltech-green dark:group-hover:text-emerald-400 transition-colors">
          {title}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
      </div>
      <ChevronRight
        size={18}
        className="text-gray-300 dark:text-gray-600 transition-transform group-hover:translate-x-1"
      />
    </div>
  );
}
