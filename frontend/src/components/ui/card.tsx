import { type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  children: ReactNode;
}

const cardVariants = cva(
  'bg-card-bg text-card-text border border-card-border rounded-lg',
  {
    variants: {
      padding: {
        none: 'p-0',
        small: 'p-4',
        medium: 'p-6',
        large: 'p-8',
      },
      shadow: {
        none: 'shadow-none',
        small: 'shadow-sm',
        medium: 'shadow',
        large: 'shadow-lg',
      },
    },
    defaultVariants: {
      padding: 'medium',
      shadow: 'small',
    },
  }
);

interface CardComposition {
  Header: typeof CardHeader;
  Footer: typeof CardFooter;
}

interface CardType extends React.FC<CardProps>, CardComposition { }

const Card: CardType = (({
  children,
  padding,
  shadow,
  className = '',
  ...props
}) => {
  return (
    <div
      className={cn(cardVariants({ padding, shadow }), className)}
      {...props}
    >
      {children}
    </div>
  );
}) as CardType;

const cardHeaderVariants = cva('border-b border-card-border pb-4 mb-4');

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={cn(cardHeaderVariants(), className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CardFooter: React.FC<CardFooterProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={cn('pt-4 mt-4 border-t border-card-border', className)}
      {...props}
    >
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Footer = CardFooter;

export { Card, CardHeader, CardFooter };
