import { cva, type VariantProps } from "class-variance-authority";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, {
  cloneElement,
  createContext,
  isValidElement,
  type ReactNode,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "./dropdown-menu";

// Context for sidebar state
interface SidebarContextType {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  size: "small" | "medium" | "large" | null | undefined;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a Sidebar");
  }
  return context;
};

export interface SidebarItem {
  name: string;
  href: string;
  icon: ReactNode;
  description?: string;
  permission?: boolean;
  fallbackName?: string; // Name to show when permission is false
  fallbackIcon?: ReactNode; // Icon to show when permission is false
}

const sidebarVariants = cva(
  "flex flex-col shrink-0 bg-sidebar-bg text-sidebar-text overflow-hidden h-full transition-[width] duration-300 ease-in-out relative",
  {
    variants: {
      width: {
        small: "w-16",
        medium: "w-20",
        large: "w-24",
        expanded: "w-64",
      },
    },
    defaultVariants: {
      width: "medium",
    },
  }
);

const sidebarItemVariants = cva("flex transition-all duration-300 w-full", {
  variants: {
    size: {
      small: "py-1.5 px-2",
      medium: "py-2 px-4",
      large: "py-3 px-6",
    },
    mode: {
      collapsed: "flex-col items-center justify-center text-center space-y-0",
      expanded: "flex-row items-center justify-start text-left space-x-3 px-4 py-3",
    },
    state: {
      active:
        "bg-sidebar-item-active text-sidebar-text border-l-4 border-sidebar-item-active",
      inactive:
        "text-sidebar-text hover:bg-sidebar-item-hover border-l-4 border-transparent",
    },
  },
  defaultVariants: {
    size: "medium",
    mode: "collapsed",
    state: "inactive",
  },
});

const sidebarIconVariants = cva(
  "text-sidebar-icon flex items-center justify-center transition-all",
  {
    variants: {
      size: {
        small: "h-8 w-8",
        medium: "h-12 w-12",
        large: "h-14 w-14",
      },
      mode: {
        collapsed: "",
        expanded: "h-8 w-8",
      },
    },
    defaultVariants: {
      size: "medium",
      mode: "collapsed",
    },
  }
);

const sidebarLabelVariants = cva("font-medium transition-all", {
  variants: {
    size: {
      small: "text-[10px]",
      medium: "text-[11px]",
      large: "text-sm",
    },
    mode: {
      collapsed: "",
      expanded: "text-[16px] font-bold",
    },
  },
  defaultVariants: {
    size: "medium",
    mode: "collapsed",
  },
});

const separatorVariants = cva("mx-3 my-2 border-t", {
  variants: {
    variant: {
      default: "border-sidebar-separator",
      light: "border-sidebar-separator/50",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface TooltipProps {
  label: string;
  description: string;
  y: number;
  x?: number;
}

const Tooltip: React.FC<TooltipProps> = ({ label, description, y, x }) => {
  return createPortal(
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        top: `${y}px`,
        left: x ? `${x}px` : "5rem",
        transform: "translateY(-50%)",
      }}
    >
      <div className="bg-sidebar-bg text-sidebar-text px-4 py-3 rounded-lg shadow-2xl border border-sidebar-separator/50 max-w-xs">
        <div className="font-semibold text-sm mb-1">{label}</div>
        <div className="text-xs text-sidebar-text/80">{description}</div>
      </div>
    </div>,
    document.body
  );
};

interface SidebarProps extends VariantProps<typeof sidebarVariants> {
  children?: ReactNode;
  className?: string;
  staticButton?: ReactNode;
  size?: "small" | "medium" | "large";
}

interface SidebarComposition {
  Nav: typeof SidebarNav;
  Item: typeof SidebarItem;
  Separator: typeof SidebarSeparator;
  Section: typeof SidebarSection;
  Header: typeof SidebarHeader;
  Footer: typeof SidebarFooter;
  Logo: typeof SidebarLogo;
  Avatar: typeof UserAvatar;
  UserMenu: typeof UserMenu;
}

type SidebarType = React.FC<SidebarProps> & SidebarComposition;

const Sidebar = (({
  size = "medium",
  className = "",
  children,
  staticButton,
}: SidebarProps) => {
  // Default to collapsed
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  const childrenArray = React.Children.toArray(children);
  const header = childrenArray.find(
    child => isValidElement(child) && (child.type as any).displayName === "SidebarHeader"
  );
  const footer = childrenArray.find(
    child => isValidElement(child) && (child.type as any).displayName === "SidebarFooter"
  );
  const mainContent = childrenArray.filter(
    child =>
      isValidElement(child) &&
      (child.type as any).displayName !== "SidebarHeader" &&
      (child.type as any).displayName !== "SidebarFooter"
  );

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleCollapse, size }}>
      <div
        className={cn(
          sidebarVariants({
            width: isCollapsed ? size : "expanded",
            className,
          })
        )}
        style={{ boxShadow: "1px 0 2px rgba(0, 0, 0, 0.05)" }}
      >
        {header}
        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide">
          {mainContent}
        </div>
        {footer}

        {/* Toggle Button Area */}
        <button
          onClick={toggleCollapse}
          className="flex w-full items-center justify-center py-2 border-t border-sidebar-separator min-h-10 hover:bg-sidebar-item-hover text-sidebar-icon transition-colors outline-none focus-visible:bg-sidebar-item-hover"
          title={isCollapsed ? "Expand" : "Collapse"}
          type="button"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {staticButton && (
          <div className="border-t border-sidebar-separator">
            {staticButton}
          </div>
        )}
      </div>
    </SidebarContext.Provider>
  );
}) as SidebarType;

interface SidebarHeaderProps {
  children?: ReactNode;
  className?: string;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ children, className = "" }) => {
  return (
    <div className={cn("border-b border-sidebar-separator", className)}>
      {children}
    </div>
  );
};
SidebarHeader.displayName = "SidebarHeader";

const sidebarLogoVariants = cva("flex items-center", {
  variants: {
    size: {
      small: "gap-2",
      medium: "gap-2",
      large: "gap-2", // Kept gap-2 for Large in Sidebar to save space
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

const sidebarLogoTextVariants = cva("font-bold text-sidebar-text", {
  variants: {
    size: {
      small: "text-lg",
      medium: "text-xl",
      large: "text-2xl",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

interface SidebarLogoProps extends VariantProps<typeof sidebarLogoVariants> {
  logo?: ReactNode;
  text?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}

const SidebarLogo: React.FC<SidebarLogoProps> = ({
  logo,
  text,
  href,
  onClick,
  size,
  className = "",
  children,
}) => {
  const content = (
    <>
      {logo}
      {text && <span className={sidebarLogoTextVariants({ size })}>{text}</span>}
      {children}
    </>
  );

  const baseClasses = sidebarLogoVariants({
    size,
    className: cn(className, "transition-all duration-300"),
  });

  if (href || onClick) {
    return (
      <a href={href} onClick={onClick} className={baseClasses}>
        {content}
      </a>
    );
  }

  return <div className={baseClasses}>{content}</div>;
};
SidebarLogo.displayName = "SidebarLogo";

interface SidebarFooterProps {
  children?: ReactNode;
  className?: string;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ children, className = "" }) => {
  return (
    <div className={cn("border-t border-sidebar-separator mt-auto w-full", className)}>
      {children}
    </div>
  );
};
SidebarFooter.displayName = "SidebarFooter";

interface UserAvatarProps {
  name: string;
  email?: string;
  initials?: string;
  avatarUrl?: string;
  className?: string;
  avatarClassName?: string;
  showChevron?: boolean;
  onClick?: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  name,
  initials,
  avatarUrl,
  className = "",
  avatarClassName = "bg-red-600 text-white",
  onClick,
}) => {
  const userInitials =
    initials ||
    name
      ?.split(" ")
      .map(n => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

  const { isCollapsed } = useSidebar();

  return (
    <div
      className={cn(
        "flex items-center space-x-2 cursor-pointer bg-profile-bg hover:bg-voltech-green p-2 px-6 rounded-lg transition-colors w-full",
        isCollapsed ? "justify-center" : "justify-start",
        className
      )}
      onClick={onClick}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="rounded-full object-cover shrink-0 h-8 w-8 transition-all"
        />
      ) : (
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center font-semibold text-sm rounded-full shrink-0 transition-all",
            avatarClassName
          )}
        >
          {userInitials}
        </div>
      )}
      {!isCollapsed && (
        <div className="flex-1 min-w-0 overflow-hidden text-left pl-3">
          <p className="text-[16px] font-medium text-sidebar-text truncate">{name}</p>
        </div>
      )}
    </div>
  );
};

interface UserMenuProps extends UserAvatarProps {
  children?: ReactNode;
  menuClassName?: string;
  showUserInfo?: boolean;
  align?: "center" | "start" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
}

const UserMenu: React.FC<UserMenuProps> = ({
  name,
  email,
  initials,
  avatarUrl,
  avatarClassName,
  children,
  menuClassName = "w-64",
  showUserInfo = true,
  align = "end",
  side = "right",
  sideOffset = 8,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div role="button" tabIndex={0} className="outline-none w-full">
          <UserAvatar
            name={name}
            email={email}
            initials={initials}
            avatarUrl={avatarUrl}
            avatarClassName={avatarClassName}
            showChevron={true}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={menuClassName} align={align} side={side} sideOffset={sideOffset}>
        {showUserInfo && (
          <>
            <div className="px-4 py-3">
              <p className="text-sm font-medium text-profile-text">{name}</p>
              {email && (
                <p className="text-xs text-profile-text-secondary">{email}</p>
              )}
            </div>
            <DropdownMenuSeparator />
          </>
        )}

        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


interface SidebarNavProps {
  items: SidebarItem[];
  currentPath: string;
  onNavigate?: (href: string) => void;
  className?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  hoverItemClassName?: string;
  inactiveItemClassName?: string;
  iconClassName?: string;
  labelClassName?: string;
  separatorIndices?: number[];
  size?: "small" | "medium" | "large"; // Optional override
}

const SidebarNav: React.FC<SidebarNavProps> = ({
  items,
  currentPath,
  onNavigate,
  className = "",
  itemClassName = "",
  activeItemClassName,
  hoverItemClassName,
  inactiveItemClassName,
  iconClassName,
  labelClassName,
  separatorIndices = [],
}) => {
  const { isCollapsed, size: contextSize } = useSidebar();
  const size = contextSize || "medium";
  const [tooltip, setTooltip] = useState<{
    label: string;
    description: string;
    y: number;
  } | null>(null);

  const isActive = (href: string) => {
    // Exact match for root path so that its only active on homepage
    if (href === "/") {
      return currentPath === "/";
    }
    // for other paths, check if currentPath starts with href
    return currentPath.startsWith(href);
  };

  const mode = isCollapsed ? "collapsed" : "expanded";

  return (
    <>
      <nav className={`flex-1 py-0 ${className}`}>
        {items.map((item, index) => {
          const hasFallback = !!item.fallbackName || !!item.fallbackIcon;

          if (item.permission === false && !hasFallback) {
            return null;
          }

          const name =
            item.permission === false && item.fallbackName
              ? item.fallbackName
              : item.name;
          const icon =
            item.permission === false && item.fallbackIcon
              ? item.fallbackIcon
              : item.icon;

          return (
            <div key={name}>
              <div
                onMouseEnter={e => {
                  if (item.description) {
                    setTooltip({
                      label: name,
                      description: item.description,
                      y: e.clientY,
                    });
                  }
                }}
                onMouseMove={e => {
                  if (item.description && tooltip) {
                    setTooltip({
                      label: name,
                      description: item.description,
                      y: e.clientY,
                    });
                  }
                }}
                onMouseLeave={() => setTooltip(null)}
              >
                <button
                  onClick={() => onNavigate?.(item.href)}
                  className={sidebarItemVariants({
                    size: isCollapsed ? size : undefined,
                    mode,
                    state: isActive(item.href) ? "active" : "inactive",
                    className: cn(
                      itemClassName,
                      isActive(item.href)
                        ? activeItemClassName
                        : cn(inactiveItemClassName, hoverItemClassName),
                      !isCollapsed && "py-1 px-3"
                    ),
                  })}
                >
                  <div
                    className={sidebarIconVariants({
                      size: isCollapsed ? size : undefined,
                      mode,
                      className: iconClassName,
                    })}
                  >
                    {isValidElement(icon)
                      ? cloneElement(icon, {
                        size: isCollapsed
                          ? size === "small"
                            ? 24
                            : size === "large"
                              ? 32
                              : 28
                          : 28, // This line is changed from 22 to 24
                      } as any)
                      : icon}
                  </div>
                  <span
                    className={sidebarLabelVariants({
                      size: isCollapsed ? size : undefined,
                      mode,
                      className: labelClassName,
                    })}
                  >
                    {name}
                  </span>
                </button>
              </div>
              {separatorIndices.includes(index) && <SidebarSeparator />}
            </div>
          );
        })}
      </nav>
      {tooltip && (
        <Tooltip
          label={tooltip.label}
          description={tooltip.description}
          y={tooltip.y}
          x={isCollapsed ? 84 : 260}
        />
      )}
    </>
  );
};

interface SidebarItemProps extends VariantProps<typeof sidebarItemVariants> {
  icon: ReactNode;
  label: string;
  description?: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
  hasPermission?: boolean;
  showSeparatorAfter?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  description,
  isActive = false,
  onClick,
  size: propSize,
  className = "",
  iconClassName = "",
  labelClassName = "",
  hasPermission = true,
  showSeparatorAfter = false,
}) => {
  const { isCollapsed, size: contextSize } = useSidebar();
  const size = propSize || contextSize || "medium";
  const [tooltip, setTooltip] = useState<{ y: number } | null>(null);

  if (!hasPermission) {
    return null;
  }

  const mode = isCollapsed ? "collapsed" : "expanded";

  return (
    <div>
      <div
        onMouseEnter={e => {
          if (description) {
            setTooltip({ y: e.clientY });
          }
        }}
        onMouseMove={e => {
          if (description) {
            setTooltip({ y: e.clientY });
          }
        }}
        onMouseLeave={() => setTooltip(null)}
        className="relative"
      >
        <button
          onClick={onClick}
          className={sidebarItemVariants({
            size: isCollapsed ? size : undefined,
            mode,
            state: isActive ? "active" : "inactive",
            className: cn(className, !isCollapsed && "py-1 px-3"),
          })}
        >
          <div
            className={sidebarIconVariants({
              size: isCollapsed ? size : undefined,
              mode,
              className: iconClassName,
            })}
          >
            {isValidElement(icon)
              ? cloneElement(icon, {
                size: isCollapsed
                  ? size === "small"
                    ? 24
                    : size === "large"
                      ? 32
                      : 28
                  : 28,
              } as any)
              : icon}
          </div>
          <span
            className={sidebarLabelVariants({
              size: isCollapsed ? size : undefined,
              mode,
              className: labelClassName,
            })}
          >
            {label}
          </span>
        </button>
        {tooltip && description && (
          <Tooltip
            label={label}
            description={description}
            y={tooltip.y}
            x={isCollapsed ? 84 : 260}
          />
        )}
      </div>
      {showSeparatorAfter && <SidebarSeparator />}
    </div>
  );
};

interface SidebarSeparatorProps extends VariantProps<typeof separatorVariants> {
  className?: string;
  size?: any; // To consume size if passed
}

const SidebarSeparator: React.FC<SidebarSeparatorProps> = ({
  variant,
  className = "",
  size,
  ...props
}) => {
  return (
    <div className={separatorVariants({ variant, className })} {...props} />
  );
};

interface SidebarSectionProps {
  children?: ReactNode;
  className?: string;
  separatorIndices?: number[];
  showTopSeparator?: boolean;
  showBottomSeparator?: boolean;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  children,
  className = "",
  separatorIndices = [],
  showTopSeparator = true,
  showBottomSeparator = true,
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={`flex flex-col ${className}`}>
      {showTopSeparator && <SidebarSeparator />}
      {childrenArray.map((child, index) => (
        <div key={index}>
          {child}
          {(separatorIndices.includes(index) ||
            index === childrenArray.length - 1) &&
            showBottomSeparator &&
            index === childrenArray.length - 1 ? (
            <SidebarSeparator />
          ) : separatorIndices.includes(index) ? (
            <SidebarSeparator />
          ) : null}
        </div>
      ))}
    </div>
  );
};

Sidebar.Nav = SidebarNav;
Sidebar.Item = SidebarItem;
Sidebar.Separator = SidebarSeparator;
Sidebar.Section = SidebarSection;
Sidebar.Header = SidebarHeader;
Sidebar.Footer = SidebarFooter;
Sidebar.Logo = SidebarLogo;
Sidebar.Avatar = UserAvatar;
Sidebar.UserMenu = UserMenu;

export { Sidebar };
export type { SidebarItem };
