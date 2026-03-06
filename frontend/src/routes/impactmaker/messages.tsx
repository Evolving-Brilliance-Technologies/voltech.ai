import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MessageSquare, Search } from "lucide-react";
import { Header } from "@/components/impactmaker/layout/Header";

export const Route = createFileRoute("/messages")({
  component: Messages,
});

function Messages() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full"
    >
      <Header title="Messages" />

      <div className="px-4 md:px-0 py-3 md:py-8 sticky top-0 z-30 bg-[#FAFAFA]/90 dark:bg-[#0B1120]/90 backdrop-blur-md border-b border-gray-100 dark:border-white/5 md:border-none">
        <div className="hidden md:block mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-display">
            Messages
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Stay in touch with your team and organizations.
          </p>
        </div>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-2xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-voltech-green/20 focus:border-voltech-green dark:text-white transition-all shadow-sm md:max-w-md"
          />
        </div>
      </div>

      <main className="flex-1 px-4 md:px-0 py-4 md:py-0 space-y-3">
        {[
          {
            name: "ASEAN Earth Cleanup",
            msg: "Don't forget your gloves tomorrow!",
            time: "10:42 AM",
            unread: 2,
            group: true,
          },
          {
            name: "Sarah from Voltech",
            msg: "Your impact report is ready.",
            time: "Yesterday",
            unread: 0,
          },
          {
            name: "Eco Warriors KL",
            msg: "Great job everyone!",
            time: "Tuesday",
            unread: 0,
            group: true,
          },
        ].map((chat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer"
          >
            <div className="w-12 h-12 bg-voltech-mint text-voltech-green rounded-full flex items-center justify-center shrink-0">
              {chat.group ? (
                <span className="font-bold font-display text-lg">
                  {chat.name[0]}
                </span>
              ) : (
                <MessageSquare size={20} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-semibold text-gray-900 text-sm truncate pr-2">
                  {chat.name}
                </h4>
                <span className="text-[10px] text-gray-400 shrink-0">
                  {chat.time}
                </span>
              </div>
              <p className="text-xs text-gray-500 truncate">{chat.msg}</p>
            </div>
            {chat.unread > 0 && (
              <div className="w-5 h-5 bg-voltech-green text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">
                {chat.unread}
              </div>
            )}
          </div>
        ))}
      </main>
    </motion.div>
  );
}
