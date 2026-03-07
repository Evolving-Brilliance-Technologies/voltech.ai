import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MessageSquare, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockConversations } from "@/lib/messagesData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/messages" as any)({
  component: MessagesLayout,
});

function MessagesLayout() {
  const location = useLocation();
  const isSelected = location.pathname.split("/").length > 2; // Simple check for /messages/$id

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col w-full h-full min-h-0 flex-1 md:p-6"
    >
      <div className="flex flex-col h-full min-h-0 bg-white dark:bg-slate-900/50 md:rounded-2xl md:shadow-sm md:border md:border-gray-100 md:dark:border-white/10 overflow-hidden transition-colors duration-300">
        <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
          {/* Chats List */}
          <div
            className={cn(
              "md:w-80 border-r border-gray-100 dark:border-white/10 flex flex-col bg-gray-50/30 dark:bg-slate-800/20 transition-all duration-300",
              isSelected ? "hidden md:flex" : "flex w-full"
            )}
          >
            <div className="p-4 border-b border-gray-100 dark:border-white/10 bg-white dark:bg-transparent">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display flex items-center gap-2 mb-4">
                <MessageSquare size={24} className="text-voltech-green" />
                Messages
              </h2>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <Input
                  placeholder="Search chats..."
                  className="pl-10 h-10 bg-gray-50 dark:bg-slate-900 border-none dark:text-white"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {mockConversations.map(chat => {
                const isActive = location.pathname.includes(
                  `/messages/${chat.id}`
                );
                return (
                  <Link
                    key={chat.id}
                    to={"/messages/$id" as any}
                    params={{ id: chat.id } as any}
                    className={cn(
                      "w-full p-4 flex gap-3 hover:bg-white dark:hover:bg-slate-800 transition-colors text-left border-b border-gray-50 dark:border-white/5",
                      isActive &&
                        "bg-white dark:bg-slate-800 shadow-sm z-10 border-l-4 border-l-voltech-green dark:border-l-emerald-400"
                    )}
                  >
                    <div className="relative shrink-0">
                      <div className="h-12 w-12 rounded-full bg-voltech-green/10 flex items-center justify-center text-voltech-green font-bold text-lg">
                        {chat.user.initials}
                      </div>
                      {chat.user.status === "online" && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-gray-900 dark:text-white truncate">
                          {chat.user.name}
                        </span>
                        <span className="text-[10px] text-gray-400 uppercase font-medium">
                          {chat.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {chat.lastMessage}
                      </p>
                    </div>
                    {chat.unreadCount && (
                      <div className="h-5 min-w-5 px-1 rounded-full bg-voltech-green text-white text-[10px] font-bold flex items-center justify-center">
                        {chat.unreadCount}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Chat Area - Outlet */}
          <div
            className={cn(
              "flex-1 flex flex-col bg-white dark:bg-transparent min-h-0",
              !isSelected ? "hidden md:flex" : "flex"
            )}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
