import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

// Custom Dropdown Component
interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'start' | 'end';
  className?: string;
}

interface DropdownComposition {
  Item: typeof DropdownItem;
  Separator: typeof DropdownSeparator;
}

interface DropdownType extends React.FC<DropdownProps>, DropdownComposition { }

const Dropdown = (({ trigger, children, align = 'end', className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div
          className={cn(
            'absolute top-full mt-2 bg-dropdown-bg text-dropdown-text border border-dropdown-border rounded-lg shadow-lg py-1 z-50',
            align === 'end' ? 'right-0' : 'left-0',
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}) as DropdownType;

const DropdownItem: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}> = ({ children, onClick, className = '' }) => {
  return (
    <div
      className={cn('px-4 py-2 bg-dropdown-bg hover:bg-dropdown-item-hover cursor-pointer transition-colors', className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const DropdownSeparator: React.FC = () => {
  return <div className="h-px my-1 bg-dropdown-separator" />;
};

Dropdown.Item = DropdownItem;
Dropdown.Separator = DropdownSeparator;

export { Dropdown };
