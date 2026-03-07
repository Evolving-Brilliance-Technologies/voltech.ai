interface HeaderProps {
  title?: string;
  showLogo?: boolean;
}

export function Header({ title, showLogo = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 glass dark:bg-linear-to-b dark:from-black/90 dark:to-slate-900/80 dark:border-white/10 backdrop-blur-md px-4 py-3 flex items-center justify-between md:hidden">
      <div className="flex items-center gap-3">
        {showLogo && (
          <div className="w-9 h-9 bg-voltech-green rounded-lg flex items-center justify-center shadow-sm shrink-0">
            <img
              src="/assets/logos/logo-white.png"
              alt="Voltech.ai"
              className="w-6 h-6 object-contain"
            />
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
