import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Bell,
  ChevronRight,
  Coins,
  LogOut,
  RefreshCw,
  Settings,
  Shield,
  Target,
  UserCircle,
} from "lucide-react";
import { Header } from "@/components/impactmaker/layout/Header";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex flex-col"
    >
      <Header title="Profile" />

      <main className="flex-1 px-4 py-6 space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden">
            <img
              src="https://picsum.photos/seed/alex/100/100"
              alt="Profile"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-xl font-semibold text-gray-900">
              Alex Chen
            </h2>
            <p className="text-sm text-gray-500">alex.chen@example.com</p>
          </div>
          <button
            type="button"
            className="w-10 h-10 bg-gray-50 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <Settings size={20} />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-voltech-dark text-white rounded-2xl p-4 shadow-md active:scale-[0.98] transition-transform cursor-pointer">
            <Coins size={24} className="text-yellow-400 mb-2" />
            <h3 className="font-semibold text-lg">1,250</h3>
            <p className="text-xs text-white/70">Voltech Coins</p>
          </div>
          <div className="bg-voltech-mint text-voltech-green rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-transform cursor-pointer">
            <RefreshCw size={24} className="mb-2" />
            <h3 className="font-semibold text-lg">Exchange</h3>
            <p className="text-xs opacity-80">Rewards & Offers</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <MenuItem
            icon={Target}
            title="My Goals"
            subtitle="Track your ESG/SDG targets"
            color="text-blue-500"
            bg="bg-blue-50"
          />
          <div className="h-[1px] bg-gray-50 mx-4" />
          <MenuItem
            icon={UserCircle}
            title="Personal Info"
            subtitle="Update your details"
            color="text-purple-500"
            bg="bg-purple-50"
          />
          <div className="h-[1px] bg-gray-50 mx-4" />
          <MenuItem
            icon={Shield}
            title="Privacy & Security"
            subtitle="Job privacy settings"
            color="text-emerald-500"
            bg="bg-emerald-50"
          />
          <div className="h-[1px] bg-gray-50 mx-4" />
          <MenuItem
            icon={Bell}
            title="Notifications"
            subtitle="Manage alerts"
            color="text-amber-500"
            bg="bg-amber-50"
          />
        </div>

        <button
          type="button"
          className="w-full bg-red-50 text-red-600 font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
        >
          <LogOut size={20} />
          Sign Out
        </button>
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
    <div className="flex items-center gap-4 p-4 active:bg-gray-50 transition-colors cursor-pointer">
      <div
        className={`w-10 h-10 ${bg} ${color} rounded-xl flex items-center justify-center shrink-0`}
      >
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
      <ChevronRight size={18} className="text-gray-400" />
    </div>
  );
}
