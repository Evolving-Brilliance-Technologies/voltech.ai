import { flexRender, type Table as TableType } from "@tanstack/react-table";
import { cn } from "../../lib/utils";
import { Table } from "./EBTTable";

// Helper function to determine data type for styling
function getDataType(value: unknown): string {
  if (typeof value === "number") return "number";
  if (
    value instanceof Date ||
    (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value))
  )
    return "date";
  if (typeof value === "string" && value.includes(".")) {
    const ext = value.split(".").pop()?.toLowerCase();
    if (
      [
        "pdf",
        "doc",
        "docx",
        "xls",
        "xlsx",
        "csv",
        "jpg",
        "jpeg",
        "png",
        "file",
      ].includes(ext || "")
    )
      return "file";
  }
  return "text";
}

interface DataTableProps<TData> {
  table: TableType<TData>;
  showIndex?: boolean;
  onRowClick?: (row: TData) => void;
  isLoading?: boolean;
  className?: string;
  showFooter?: boolean;
}

export function DataTable<TData>({
  table,
  showIndex = true,
  onRowClick,
  isLoading,
  className,
  showFooter = false,
}: DataTableProps<TData>) {
  const totalWidth = table.getTotalSize();
  const indexColumnWidth = 48; // w-12 = 48px
  const tableMinWidth = totalWidth + (showIndex ? indexColumnWidth : 0);
  const rows = table.getRowModel().rows;

  return (
    <div
      className={cn(
        "my-4 rounded-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden h-[600px]",
        className
      )}
    >
      <div className="h-full overflow-auto">
        <Table style={{ minWidth: tableMinWidth }} className="min-h-full">
          {/* Sticky Header */}
          <Table.Header className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            {table.getHeaderGroups().map(headerGroup => (
              <Table.Row
                key={headerGroup.id}
                className="border-none hover:bg-transparent"
              >
                {showIndex && (
                  <Table.Head
                    className="w-12 text-center px-3 py-4 text-gray-700 dark:text-gray-300 font-bold text-sm border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900"
                    style={{
                      width: indexColumnWidth,
                      minWidth: indexColumnWidth,
                    }}
                  >
                    #
                  </Table.Head>
                )}
                {headerGroup.headers.map(header => {
                  const align = (
                    header.column.columnDef.meta as {
                      align?: "left" | "center" | "right";
                    }
                  )?.align;
                  return (
                    <Table.Head
                      key={header.id}
                      className={`px-4 py-4 text-gray-700 dark:text-gray-300 font-bold text-xs border-r border-gray-200 dark:border-gray-800 last:border-r-0 whitespace-normal bg-gray-50 dark:bg-gray-900 ${align === "right"
                        ? "text-right"
                        : align === "center"
                          ? "text-center"
                          : "text-left"
                        }`}
                      style={{
                        width: header.getSize(),
                        minWidth: header.column.columnDef.minSize,
                        maxWidth: header.column.columnDef.maxSize,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </Table.Head>
                  );
                })}
              </Table.Row>
            ))}
          </Table.Header>

          {/* Body */}
          <Table.Body>
            {isLoading && rows.length === 0 ? (
              <Table.Row className="hover:bg-transparent">
                <Table.Cell
                  colSpan={
                    table.getHeaderGroups()[0]?.headers.length +
                    (showIndex ? 1 : 0)
                  }
                  className="h-full"
                >
                  <div className="flex flex-col items-center justify-center space-y-3 p-8 h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
                    <p className="font-medium text-gray-600 dark:text-gray-300">
                      Loading data...
                    </p>
                  </div>
                </Table.Cell>
              </Table.Row>
            ) : rows.length === 0 ? (
              <Table.Row className="hover:bg-transparent">
                <Table.Cell
                  colSpan={
                    table.getHeaderGroups()[0]?.headers.length +
                    (showIndex ? 1 : 0)
                  }
                  className="h-full"
                >
                  <div className="flex flex-col items-center justify-center space-y-3 p-8 h-full">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-400 dark:text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <title>No Data</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-center text-gray-600 dark:text-gray-300">
                        No entries found
                      </p>
                      <p className="text-sm text-center text-gray-400 dark:text-gray-500 mt-1">
                        Add your first entry to get started
                      </p>
                    </div>
                  </div>
                </Table.Cell>
              </Table.Row>
            ) : (
              <>
                {rows.map((row, index) => (
                  <Table.Row
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => onRowClick?.(row.original)}
                    className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${onRowClick ? "cursor-pointer" : ""
                      } bg-white dark:bg-gray-950 data-[state=selected]:bg-green-50 dark:data-[state=selected]:bg-green-900/10`}
                  >
                    {showIndex && (
                      <Table.Cell className="w-12 text-center px-3 py-3 border-r border-gray-200 dark:border-gray-600 border-b border-gray-100 dark:border-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700">
                        {index + 1}
                      </Table.Cell>
                    )}
                    {row.getVisibleCells().map(cell => {
                      const value = cell.getValue();
                      const dataType = getDataType(value);
                      const shouldCheckEmpty =
                        value !== undefined || cell.column.id.startsWith("_");
                      const isEmpty =
                        shouldCheckEmpty &&
                        (value === null ||
                          value === undefined ||
                          value === "" ||
                          (typeof value === "string" && value.trim() === ""));

                      const align = (
                        cell.column.columnDef.meta as {
                          align?: "left" | "center" | "right";
                        }
                      )?.align;

                      return (
                        <Table.Cell
                          key={cell.id}
                          data-type={dataType}
                          className={`px-4 py-3 border-r border-gray-100 dark:border-gray-700 border-b border-gray-100 dark:border-gray-800 last:border-r-0 text-xs ${align === "right"
                            ? "text-right"
                            : align === "center"
                              ? "text-center"
                              : "text-left"
                            } ${isEmpty
                              ? "text-gray-400 dark:text-gray-500"
                              : dataType === "number"
                                ? "text-right font-medium text-green-600 dark:text-blue-400"
                                : dataType === "date"
                                  ? "text-orange-600 dark:text-orange-400"
                                  : dataType === "file"
                                    ? "text-center text-green-600 dark:text-green-400"
                                    : "text-gray-800 dark:text-gray-200"
                            }`}
                          style={{
                            width: cell.column.getSize(),
                            minWidth: cell.column.columnDef.minSize,
                            maxWidth: cell.column.columnDef.maxSize,
                          }}
                        >
                          {isEmpty
                            ? "-"
                            : flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                        </Table.Cell>
                      );
                    })}
                  </Table.Row>
                ))}

                {/* Filler row to push footer to bottom when content is short */}
                <tr className="h-full border-none bg-transparent hover:bg-transparent">
                  <td
                    colSpan={
                      table.getHeaderGroups()[0]?.headers.length +
                      (showIndex ? 1 : 0)
                    }
                    className="p-0 border-none"
                  />
                </tr>
              </>
            )}
          </Table.Body>

          {/* Sticky Footer */}
          {showFooter && (
            <Table.Footer className="sticky bottom-0 z-10 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
              {table.getFooterGroups().map(footerGroup => (
                <Table.Row
                  key={footerGroup.id}
                  className="border-none hover:bg-transparent"
                >
                  {showIndex && (
                    <Table.Cell className="w-12 border-t border-r border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900" />
                  )}
                  {footerGroup.headers.map(header => {
                    const align = (
                      header.column.columnDef.meta as {
                        align?: "left" | "center" | "right";
                      }
                    )?.align;
                    return (
                      <Table.Cell
                        key={header.id}
                        className={`px-4 py-3 border-r border-gray-200 dark:border-gray-600 last:border-r-0 text-sm font-medium text-gray-900 dark:text-gray-100 whitespace-normal bg-gray-50 dark:bg-gray-900 ${align === "right"
                          ? "text-right"
                          : align === "center"
                            ? "text-center"
                            : "text-left"
                          }`}
                        style={{
                          width: header.getSize(),
                          minWidth: header.column.columnDef.minSize,
                          maxWidth: header.column.columnDef.maxSize,
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                      </Table.Cell>
                    );
                  })}
                </Table.Row>
              ))}
            </Table.Footer>
          )}
        </Table>
      </div>
    </div>
  );
}

export type { DataTableProps };
