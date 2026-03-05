import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "@/lib/utils";

const tableVariants = cva(
    "w-full caption-bottom text-sm border-separate border-spacing-0"
);

interface TableProps
    extends React.TableHTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> { }

const Table = React.forwardRef<HTMLTableElement, TableProps>(
    ({ className, ...props }, ref) => (
        <div
            data-slot="table-container"
            className="relative w-full overflow-x-auto rounded-lg border"
        >
            <table ref={ref} className={cn(tableVariants(), className)} {...props} />
        </div>
    )
);
Table.displayName = "Table";

const tableHeaderVariants = cva("[&_tr]:border-b bg-muted/50");

const TableHeader = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <thead
        ref={ref}
        className={cn(tableHeaderVariants(), className)}
        {...props}
    />
));
TableHeader.displayName = "TableHeader";

const tableBodyVariants = cva("[&_tr:last-child]:border-0");

const TableBody = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn(tableBodyVariants(), className)} {...props} />
));
TableBody.displayName = "TableBody";

const tableFooterVariants = cva(
    "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0"
);

const TableFooter = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <tfoot
        ref={ref}
        className={cn(tableFooterVariants(), className)}
        {...props}
    />
));
TableFooter.displayName = "TableFooter";

const tableRowVariants = cva(
    "hover:bg-accent/30 data-[state=selected]:bg-accent border-b transition-colors duration-150"
);

const TableRow = React.forwardRef<
    HTMLTableRowElement,
    React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
    <tr ref={ref} className={cn(tableRowVariants(), className)} {...props} />
));
TableRow.displayName = "TableRow";

const tableHeadVariants = cva(
    "text-foreground h-12 px-4 text-left align-middle font-semibold text-sm uppercase tracking-wide [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
);

const TableHead = React.forwardRef<
    HTMLTableCellElement,
    React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <th ref={ref} className={cn(tableHeadVariants(), className)} {...props} />
));
TableHead.displayName = "TableHead";

const tableCellVariants = cva(
    "px-4 py-3 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
);

const TableCell = React.forwardRef<
    HTMLTableCellElement,
    React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <td ref={ref} className={cn(tableCellVariants(), className)} {...props} />
));
TableCell.displayName = "TableCell";

const tableCaptionVariants = cva("text-muted-foreground mt-4 text-sm");

const TableCaption = React.forwardRef<
    HTMLTableCaptionElement,
    React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
    <caption
        ref={ref}
        className={cn(tableCaptionVariants(), className)}
        {...props}
    />
));
TableCaption.displayName = "TableCaption";

// Attach subcomponents for dot notation
const TableWithHOC = Table as any;
TableWithHOC.Header = TableHeader;
TableWithHOC.Body = TableBody;
TableWithHOC.Footer = TableFooter;
TableWithHOC.Row = TableRow;
TableWithHOC.Head = TableHead;
TableWithHOC.Cell = TableCell;
TableWithHOC.Caption = TableCaption;

export {
    TableWithHOC as Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
};
