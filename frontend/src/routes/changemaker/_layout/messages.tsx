import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, Search, Send, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_layout/messages")({
  component: MessagesComponent,
});

type Conversation = {
  id: string;
  user: {
    name: string;
    avatar?: string;
    initials: string;
    status: "online" | "offline";
  };
  lastMessage: string;
  time: string;
  unreadCount?: number;
};

type Message = {
  id: string;
  senderId: string;
  text: string;
  time: string;
  isMe: boolean;
};

const mockConversations: Conversation[] = [
  {
    id: "1",
    user: { name: "Alex Chen", initials: "AC", status: "online" },
    lastMessage: "Hey, can we discuss the upcoming event?",
    time: "2m ago",
    unreadCount: 2,
  },
  {
    id: "2",
    user: { name: "Sarah Miller", initials: "SM", status: "offline" },
    lastMessage: "Thanks for the feedback!",
    time: "1h ago",
  },
  {
    id: "3",
    user: { name: "John Doe", initials: "JD", status: "online" },
    lastMessage: "I'll be there on time.",
    time: "3h ago",
  },
  {
    id: "4",
    user: { name: "Emily Wilson", initials: "EW", status: "offline" },
    lastMessage: "Let me check the schedule first.",
    time: "Yesterday",
  },
];

const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "101",
      senderId: "1",
      text: "Hi there!",
      time: "2:30 PM",
      isMe: false,
    },
    {
      id: "102",
      senderId: "me",
      text: "Hello Alex! How can I help you?",
      time: "2:31 PM",
      isMe: true,
    },
    {
      id: "103",
      senderId: "1",
      text: "Hey, can we discuss the upcoming event?",
      time: "2:32 PM",
      isMe: false,
    },
  ],
};

function MessagesComponent() {
  const [selectedChat, setSelectedChat] = useState<string>("1");
  const [inputText, setInputText] = useState("");
  const currentChat = mockConversations.find(c => c.id === selectedChat);
  const messages = mockMessages[selectedChat] || [];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-white dark:bg-slate-900/50 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden transition-colors duration-300">
      <div className="flex flex-1 overflow-hidden">
        {/* Chats List */}
        <div className="w-80 border-r border-gray-100 dark:border-white/10 flex flex-col bg-gray-50/30 dark:bg-slate-950/30">
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
            {mockConversations.map(chat => (
              <button
                key={chat.id}
                type="button"
                onClick={() => setSelectedChat(chat.id)}
                className={cn(
                  "w-full p-4 flex gap-3 hover:bg-white dark:hover:bg-slate-800/50 transition-colors text-left border-b border-gray-50 dark:border-white/5",
                  selectedChat === chat.id && "bg-white dark:bg-slate-800/80 shadow-sm z-10"
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
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white dark:bg-transparent">
          {currentChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-100 dark:border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-voltech-green/10 flex items-center justify-center text-voltech-green font-bold">
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
                <Button variant="outline" size="icon" type="button" className="dark:border-white/10 dark:text-gray-400">
                  <User size={18} />
                </Button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30 dark:bg-slate-950/10">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex flex-col max-w-[70%]",
                      msg.isMe ? "ml-auto items-end" : "items-start"
                    )}
                  >
                    <div
                      className={cn(
                        "p-4 rounded-2xl text-sm shadow-sm transition-colors",
                        msg.isMe
                          ? "bg-voltech-green text-white rounded-tr-none"
                          : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-white/5 rounded-tl-none"
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
              <div className="p-4 border-t border-gray-100 dark:border-white/10">
                <form onSubmit={e => e.preventDefault()} className="flex gap-3">
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
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 italic">
              <MessageSquare size={48} className="mb-4 opacity-20" />
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
