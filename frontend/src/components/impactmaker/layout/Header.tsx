import { Bell } from "lucide-react";

interface HeaderProps {
  title?: string;
  showLogo?: boolean;
}

export function Header({ title, showLogo = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 glass px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {showLogo && (
          <div className="w-8 h-8 bg-voltech-green rounded-lg flex items-center justify-center text-white font-bold font-display shadow-sm">
            V
          </div>
        )}
        {title && (
          <h1 className="font-display font-semibold text-lg">{title}</h1>
        )}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="p-2 text-gray-600 hover:text-gray-900 relative"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </button>
      </div>
    </header>
  );
}
