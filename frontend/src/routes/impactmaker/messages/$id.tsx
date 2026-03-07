import { createFileRoute, Link } from "@tanstack/react-router";
import { Send, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockConversations, mockMessages } from "@/lib/messagesData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/messages/$id" as any)({
  component: ChatView,
});

function ChatView() {
  const { id } = Route.useParams() as { id: string };
  const [inputText, setInputText] = useState("");

  const currentChat = mockConversations.find(c => c.id === id);
  const messages = mockMessages[id] || [];

  if (!currentChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
        Conversation not found
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-100 dark:border-white/10 flex justify-between items-center bg-white dark:bg-transparent shrink-0">
        <div className="flex items-center gap-3">
          {/* Back button for mobile */}
          <Link
            to={"/messages" as any}
            className="md:hidden mr-2 p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Link>
          <div className="h-10 w-10 rounded-full bg-voltech-green/10 flex items-center justify-center text-voltech-green font-bold shrink-0">
            {currentChat.user.initials}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white leading-tight">
              {currentChat.user.name}
            </h3>
            <span className="text-xs text-emerald-500 flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Active Now
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          type="button"
          className="dark:border-white/10 dark:text-gray-400"
        >
          <User size={18} />
        </Button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-gray-50/30 dark:bg-slate-950/10 min-h-0">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={cn(
              "flex flex-col max-w-[85%] md:max-w-[70%]",
              msg.isMe ? "ml-auto items-end" : "items-start"
            )}
          >
            <div
              className={cn(
                "p-4 rounded-2xl text-sm shadow-sm transition-colors",
                msg.isMe
                  ? "bg-voltech-green text-white rounded-tr-none shadow-voltech-green/20"
                  : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-white/10 rounded-tl-none"
              )}
            >
              {msg.text}
            </div>
            <span className="text-[10px] text-gray-400 mt-1 px-1 font-medium italic">
              {msg.time}
            </span>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-transparent shrink-0">
        <form
          onSubmit={e => {
            e.preventDefault();
            setInputText("");
          }}
          className="flex gap-3"
        >
          <Input
            placeholder="Type a message..."
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            className="flex-1 h-12 bg-gray-50 dark:bg-slate-900/50 border-none focus-visible:ring-voltech-green dark:text-white dark:placeholder:text-gray-500"
          />
          <Button
            className="h-12 w-12 bg-voltech-green hover:bg-voltech-green/90 shrink-0 text-white"
            size="icon"
          >
            <Send size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
}
