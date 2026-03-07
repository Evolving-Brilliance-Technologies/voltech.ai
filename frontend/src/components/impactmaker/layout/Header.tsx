interface HeaderProps {
  title?: string;
  showLogo?: boolean;
}

export function Header({ title, showLogo = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 glass dark:bg-slate-900/80 dark:border-white/5 backdrop-blur-md px-4 py-3 flex items-center justify-between md:hidden">
      <div className="flex items-center gap-3">
        {showLogo && (
          <div className="w-8 h-8 bg-voltech-green rounded-lg flex items-center justify-center text-white font-bold font-display shadow-sm">
            V
          </div>
        )}
        {title && (
          <h1 className="font-display font-semibold text-lg text-gray-900 dark:text-white">
            {title}
          </h1>
        )}
      </div>
    </header>
  );
}
