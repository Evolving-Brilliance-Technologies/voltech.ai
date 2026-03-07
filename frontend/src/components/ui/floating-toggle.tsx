import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type FloatingToggleProps = {
  className?: string;
  onToggle?: (isOpen: boolean) => void;
  isOpen: boolean;
  disableToggle?: boolean;
  displayToggle?: boolean;
  iconOpen?: React.ReactNode;
  iconClose?: React.ReactNode;
};

function FloatingToggle({
  className = "fixed bottom-4 right-4 z-50",
  onToggle,
  isOpen,
  disableToggle = false,
  displayToggle = true,
  iconOpen,
  iconClose,
}: FloatingToggleProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(isOpen);

  useEffect(() => {
    setInternalIsOpen(isOpen);
  }, [isOpen]);

  const handleToggle = () => {
    if (disableToggle) return;
    const newState = !internalIsOpen;
    setInternalIsOpen(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  if (!displayToggle) return null;
  return (
    <button
      onClick={handleToggle}
      disabled={disableToggle}
      className={cn(
        'bg-floating-toggle-bg text-floating-toggle-icon p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-floating-toggle-focus-ring disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center',
        className
      )}
      aria-label={internalIsOpen ? "Close panel" : "Open panel"}
    >
      {
        internalIsOpen ? iconClose : iconOpen
      }
    </button>
  );
}

export { FloatingToggle };
