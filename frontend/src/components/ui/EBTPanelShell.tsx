import { cn } from '../../lib/utils';

interface PanelShellProps {
  children: React.ReactNode;
  className?: string;
}

const PanelShell = ({
  children,
  className = "fixed top-0 left-4 bottom-0 z-50",
}: PanelShellProps) => {
  return (
    <div className={cn('flex w-[389px] items-center py-24', className)}>
      <div
        className="relative flex h-[calc(100vh-14rem)] w-full flex-col overflow-hidden rounded-2xl border backdrop-blur-xl shadow-2xl"
        style={{
          backgroundColor: "var(--color-panel-bg)",
          borderColor: "var(--color-panel-border)",
          boxShadow: `0 25px 50px -12px var(--color-panel-shadow)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

interface HeaderProps {
  onClose: () => void;
  title: string;
  subtitle?: string;
  onSubtitleClick?: () => void;
  direction?: "ltr" | "rtl";
  closeIcon: React.ReactNode;
  className?: string;
  displayCloseButton?: boolean;
}

const Header = ({
  onClose,
  title,
  subtitle,
  onSubtitleClick,
  direction = "ltr",
  closeIcon,
  className = "",
  displayCloseButton = true,
}: HeaderProps) => {
  return (
    <div
      className={cn('border-b flex-shrink-0 p-5 pb-2', className)}
      style={{
        backgroundColor: "var(--color-panel-header-bg)",
        borderColor: "var(--color-panel-header-border)",
      }}
    >
      <div
        className={cn('flex items-start', direction === 'rtl' ? 'flex-row-reverse' : 'flex-row')}
      >
        {displayCloseButton && (
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full w-10 h-10 transition-all duration-300 flex-shrink-0 hover:bg-panel-button-hover text-panel-text"
          >
            {closeIcon}
          </button>
        )}
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-3">
            <div>
              <h2 className="font-bold text-xl ml-3 text-panel-text">
                {title}
              </h2>
              {onSubtitleClick && subtitle && (
                <button
                  onClick={onSubtitleClick}
                  type="button"
                  className="text-sm font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity duration-200 ml-3 mt-1 text-panel-text-secondary"
                >
                  {subtitle}
                </button>
              )}
              {!onSubtitleClick && subtitle && (
                <p className="text-sm ml-3 mt-1 text-panel-text-secondary">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ContentProps {
  children: React.ReactNode;
  className?: string;
}

const Content = ({ children, className = "" }: ContentProps) => {
  return (
    <div className={cn('flex-1 space-y-5 p-6 overflow-y-auto pb-24', className)}>
      {children}
    </div>
  );
};

PanelShell.Content = Content;
PanelShell.Header = Header;

export { PanelShell };
