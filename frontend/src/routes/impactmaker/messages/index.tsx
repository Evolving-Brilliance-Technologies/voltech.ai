import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare } from "lucide-react";

export const Route = createFileRoute("/messages/" as any)({
  component: MessagesIndex,
});

function MessagesIndex() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 italic">
      <MessageSquare size={48} className="mb-4 opacity-20" />
      Select a chat to start messaging
    </div>
  );
}
