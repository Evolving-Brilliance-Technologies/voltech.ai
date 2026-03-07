export type Conversation = {
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

export type Message = {
  id: string;
  senderId: string;
  text: string;
  time: string;
  isMe: boolean;
};

export const mockConversations: Conversation[] = [
  {
    id: "1",
    user: { name: "Alex Chen", initials: "AC", status: "online" },
    lastMessage: "Looking forward to it!",
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
  {
    id: "5",
    user: { name: "Alex Chen", initials: "AC", status: "online" },
    lastMessage: "Hey, can we discuss the upcoming event?",
    time: "2m ago",
  },
  {
    id: "6",
    user: { name: "Sarah Miller", initials: "SM", status: "offline" },
    lastMessage: "Thanks for the feedback!",
    time: "1h ago",
  },
  {
    id: "7",
    user: { name: "John Doe", initials: "JD", status: "online" },
    lastMessage: "I'll be there on time.",
    time: "3h ago",
  },
  {
    id: "8",
    user: { name: "Emily Wilson", initials: "EW", status: "offline" },
    lastMessage: "Let me check the schedule first.",
    time: "Yesterday",
  },
];

export const mockMessages: Record<string, Message[]> = {
  "1": [
    { id: "101", senderId: "1", text: "Hi there!", time: "2:30 PM", isMe: false },
    { id: "102", senderId: "me", text: "Hello Alex! How can I help you?", time: "2:31 PM", isMe: true },
    { id: "103", senderId: "1", text: "Hey, can we discuss the upcoming event?", time: "2:32 PM", isMe: false },
    { id: "104", senderId: "me", text: "Sure! Which one are you referring to?", time: "2:33 PM", isMe: true },
    { id: "105", senderId: "1", text: "The ASEAN Earth Cleanup Week next month.", time: "2:34 PM", isMe: false },
    { id: "106", senderId: "me", text: "Ah, yes. I have the details right here.", time: "2:35 PM", isMe: true },
    { id: "107", senderId: "1", text: "Great! Do we have enough volunteers for the Selangor location?", time: "2:36 PM", isMe: false },
    { id: "108", senderId: "me", text: "We're currently at 80% capacity there. Still need about 20 more people.", time: "2:37 PM", isMe: true },
    { id: "109", senderId: "1", text: "I can reach out to my local community group. They might be interested.", time: "2:38 PM", isMe: false },
    { id: "110", senderId: "me", text: "That would be fantastic! Here is the registration link you can share.", time: "2:39 PM", isMe: true },
    { id: "111", senderId: "1", text: "Perfect. I'll send it over now.", time: "2:40 PM", isMe: false },
    { id: "112", senderId: "me", text: "Is there anything else you need help with?", time: "2:41 PM", isMe: true },
    { id: "113", senderId: "1", text: "Actually, yes. What about the logistics for the equipment?", time: "2:42 PM", isMe: false },
    { id: "114", senderId: "me", text: "All equipment will be provided at the site. Just bring yourselves!", time: "2:43 PM", isMe: true },
    { id: "115", senderId: "1", text: "Sounds simple enough. What time should we arrive?", time: "2:44 PM", isMe: false },
    { id: "116", senderId: "me", text: "The briefing starts at 8:00 AM sharp.", time: "2:45 PM", isMe: true },
    { id: "117", senderId: "1", text: "Understood. See you then!", time: "2:46 PM", isMe: false },
    { id: "118", senderId: "me", text: "See you! Thanks for the help.", time: "2:47 PM", isMe: true },
    { id: "119", senderId: "1", text: "Looking forward to it!", time: "2:48 PM", isMe: false },
  ],
};
