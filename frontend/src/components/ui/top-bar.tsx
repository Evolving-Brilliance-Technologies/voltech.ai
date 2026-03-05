import React, { useState, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from './dropdown-menu';
import { cn } from '@/lib/utils';

// TopBar variants
const topBarVariants = cva(
  'flex items-center justify-between bg-topbar-bg border border-topbar-border text-topbar-text',
  {
    variants: {
      size: {
        small: 'h-14',
        medium: 'h-16',
        large: 'h-20',
      },
      floating: {
        none: '',
        small: 'top-2 m-2 rounded-lg shadow-md backdrop-blur-sm',
        medium: 'top-3 mx-3 rounded-xl shadow-lg backdrop-blur-md',
        large: 'top-4 mx-4 rounded-2xl shadow-xl backdrop-blur-lg',
      },
      position: {
        sticky: 'sticky z-50',
        fixed: 'fixed top-0 left-0 right-0 z-50',
        static: '',
      },
    },
    defaultVariants: {
      size: 'medium',
      floating: 'none',
      position: 'sticky',
    },
  }
);

// Bottom Navigation variants
const bottomNavVariants = cva(
  'fixed bottom-0 left-0 right-0 z-50 transition-all duration-200 bg-topbar-bg border border-topbar-border',
  {
    variants: {
      floating: {
        none: 'border-t bg-topbar-bg',
        small: 'p-2 mx-2 mb-2 rounded-lg shadow-md backdrop-blur-sm',
        medium: 'p-3 mx-3 mb-3 rounded-xl shadow-lg backdrop-blur-md',
        large: 'p-4 mx-4 mb-4 rounded-2xl shadow-xl backdrop-blur-lg',
      },
    },
    defaultVariants: {
      floating: 'medium',
    },
  }
);

interface TopBarProps extends VariantProps<typeof topBarVariants> {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
  mobileBottomNav?: React.ReactNode;
  showMobileTopBar?: boolean;
  isMobile?: boolean;
}

interface TopBarComposition {
  Logo: typeof Logo;
  Actions: typeof Actions;
  Nav: typeof Nav;
  Toggle: typeof Toggle;
  Avatar: typeof UserAvatar;
  UserMenu: typeof UserMenu;
  BottomNav: typeof BottomNav;
}

type TopBarType = React.FC<TopBarProps> & TopBarComposition;

const TopBar = (({
  left,
  center,
  right,
  size,
  floating,
  position,
  className = '',
  mobileBottomNav,
  showMobileTopBar = true,
  isMobile = false,
}: TopBarProps) => {
  return (
    <>
      {(showMobileTopBar || !isMobile) && (
        <div
          className={topBarVariants({
            size,
            floating,
            position,
            className,
          })}
        >
          <div className="flex items-center justify-between w-full">
            {left && <div className="flex items-center">{left}</div>}
            {center && (
              <div className="absolute left-1/2 -translate-x-1/2">{center}</div>
            )}
            {right && <div className="flex items-center gap-2">{right}</div>}
          </div>
        </div>
      )}

      {mobileBottomNav && isMobile && (
        <div className={bottomNavVariants({ floating })}>{mobileBottomNav}</div>
      )}
    </>
  );
}) as TopBarType;

// TopBarLogo variants
const logoVariants = cva('flex items-center', {
  variants: {
    size: {
      small: 'gap-2',
      medium: 'gap-2',
      large: 'gap-3',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

const logoTextVariants = cva('font-bold', {
  variants: {
    size: {
      small: 'text-lg',
      medium: 'text-xl',
      large: 'text-2xl',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

interface LogoProps extends VariantProps<typeof logoVariants> {
  logo?: React.ReactNode;
  text?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  logo,
  text,
  href,
  onClick,
  size,
  className = '',
}) => {
  const content = (
    <>
      {logo}
      {text && <span className={logoTextVariants({ size })}>{text}</span>}
    </>
  );

  const baseClasses = logoVariants({
    size,
    className: cn(className, 'transition-all duration-300 hover:scale-105 text-topbar-logo'),
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

// TopBarActions
const actionsVariants = cva('flex items-center mx-4', {
  variants: {
    spacing: {
      small: 'gap-1',
      medium: 'gap-2',
      large: 'gap-3',
    },
  },
  defaultVariants: {
    spacing: 'medium',
  },
});

interface ActionsProps extends VariantProps<typeof actionsVariants> {
  children?: React.ReactNode;
  className?: string;
}

const Actions: React.FC<ActionsProps> = ({
  children,
  spacing,
  className = '',
}) => {
  return (
    <div className={actionsVariants({ spacing, className })}>{children}</div>
  );
};

// TopBarNav
const navVariants = cva('items-center lg:flex', {
  variants: {
    spacing: {
      small: 'gap-1',
      medium: 'gap-2',
      large: 'gap-4',
    },
    visible: {
      true: 'flex',
      false: 'hidden',
    },
  },
  defaultVariants: {
    spacing: 'medium',
    visible: true,
  },
});

const navItemVariants = cva(
  'flex items-center gap-2 transition-all duration-200 font-medium relative rounded-lg hover:bg-topbar-nav-hover-bg',
  {
    variants: {
      size: {
        small: 'px-2 py-1.5 text-sm',
        medium: 'px-3 py-2 text-sm',
        large: 'px-4 py-2.5 text-base',
      },
      state: {
        active:
          'text-topbar-nav-active-text after:absolute after:bottom-0 after:left-2 after:right-2 after:h-1 after:bg-topbar-nav-active-border after:rounded-full',
        inactive: 'text-topbar-text hover:text-topbar-nav-hover-text',
      },
    },
    defaultVariants: {
      size: 'medium',
      state: 'inactive',
    },
  }
);

interface NavItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

interface NavProps extends VariantProps<typeof navVariants> {
  items: NavItem[];
  currentPath: string;
  onNavigate?: (href: string) => void;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  visible?: boolean;
}

const Nav: React.FC<NavProps> = ({
  items,
  currentPath,
  onNavigate,
  spacing,
  size = 'medium',
  className = '',
  visible = true,
}) => {
  const isActive = (href: string) => currentPath === href;

  return (
    <nav className={navVariants({ spacing, visible, className })}>
      {items.map(item => (
        <button
          key={item.name}
          onClick={() => onNavigate?.(item.href)}
          className={navItemVariants({
            size,
            state: isActive(item.href) ? 'active' : 'inactive',
          })}
        >
          {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
          <span>{item.name}</span>
        </button>
      ))}
    </nav>
  );
};

// Bottom Navigation Item
const bottomNavItemVariants = cva(
  'flex flex-col items-center justify-center py-3 transition-all duration-300 relative rounded-xl',
  {
    variants: {
      state: {
        active: 'scale-110',
        inactive: 'hover:scale-105 active:scale-95',
      },
    },
    defaultVariants: {
      state: 'inactive',
    },
  }
);

interface BottomNavProps {
  items: NavItem[];
  currentPath: string;
  onNavigate?: (href: string) => void;
  className?: string;
}

const BottomNav: React.FC<BottomNavProps> = ({
  items,
  currentPath,
  onNavigate,
  className = '',
}) => {
  const isActive = (href: string) => currentPath === href;

  return (
    <div
      className={cn('grid gap-0 px-2', className)}
      style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}
    >
      {items.map(item => {
        const active = isActive(item.href);
        return (
          <button
            key={item.name}
            onClick={() => onNavigate?.(item.href)}
            className={bottomNavItemVariants({
              state: active ? 'active' : 'inactive',
            })}
          >
            {active && (
              <div className="absolute inset-1 rounded-xl bg-gradient-to-br from-blue-200/30 to-teal-200/30 border border-blue-300/40 backdrop-blur-md" />
            )}
            {item.icon && (
              <span
                className={cn('relative z-10 transition-all duration-300', active && 'drop-shadow-lg')}
              >
                {item.icon}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

// Toggle Component
const toggleVariants = cva(
  'flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500',
  {
    variants: {
      size: {
        small: 'w-8 h-8',
        medium: 'w-10 h-10',
        large: 'w-10 h-10',
      },
      variant: {
        default:
          'bg-topbar-toggle-bg hover:bg-topbar-toggle-hover-bg text-topbar-toggle-icon border border-topbar-toggle-border',
        ghost: 'hover:bg-white/10 text-current',
      },
    },
    defaultVariants: {
      size: 'medium',
      variant: 'default',
    },
  }
);

interface ToggleProps extends VariantProps<typeof toggleVariants> {
  iconOn: React.ReactNode;
  iconOff: React.ReactNode;
  defaultState?: boolean;
  onToggle?: (state: boolean) => void;
  ariaLabel?: string;
  storageKey?: string;
  className?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  size,
  variant,
  iconOn,
  iconOff,
  defaultState = false,
  onToggle,
  ariaLabel = 'Toggle',
  storageKey,
  className = '',
}) => {
  const [isOn, setIsOn] = useState<boolean>(defaultState);

  useEffect(() => {
    if (storageKey) {
      const savedState = localStorage.getItem(storageKey);
      if (savedState !== null) {
        setIsOn(savedState === 'true');
      }
    }
  }, [storageKey]);

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);

    if (storageKey) {
      localStorage.setItem(storageKey, String(newState));
    }

    onToggle?.(newState);
  };

  return (
    <button
      onClick={handleToggle}
      className={toggleVariants({ size, variant, className })}
      aria-label={ariaLabel}
      aria-pressed={isOn}
    >
      {isOn ? iconOn : iconOff}
    </button>
  );
};

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
  className = '',
  avatarClassName = 'bg-red-600 text-white',
  onClick,
}) => {
  const userInitials =
    initials ||
    name
      ?.split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

  return (
    <div
      className={cn('flex items-center space-x-2 cursor-pointer bg-profile-bg hover:bg-profile-hover p-2 rounded-lg transition-colors', className)}
      onClick={onClick}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="h-8 w-8 rounded-full object-cover"
        />
      ) : (
        <div
          className={cn('flex h-8 w-8 items-center justify-center font-semibold text-sm rounded-full', avatarClassName)}
        >
          {userInitials}
        </div>
      )}
    </div>
  );
};

// User Menu Component
interface UserMenuProps extends UserAvatarProps {
  children?: React.ReactNode;
  menuClassName?: string;
  showUserInfo?: boolean;
}

const UserMenu: React.FC<UserMenuProps> = ({
  name,
  email,
  initials,
  avatarUrl,
  avatarClassName,
  children,
  menuClassName = 'w-64',
  showUserInfo = true,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div role="button" tabIndex={0} className="outline-none">
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
      <DropdownMenuContent className={menuClassName} align="end" sideOffset={8}>
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

// Attach sub-components to TopBar
TopBar.Logo = Logo;
TopBar.Actions = Actions;
TopBar.Nav = Nav;
TopBar.Toggle = Toggle;
TopBar.Avatar = UserAvatar;
TopBar.UserMenu = UserMenu;
TopBar.BottomNav = BottomNav;

export { TopBar };

export { type NavItem };
